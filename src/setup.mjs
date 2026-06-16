import { createInterface } from 'readline';
import { writeFileSync } from 'fs';
import { login, getMembership, getSchedule } from './arbox-client.mjs';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const VALID_TIME = /^\d{2}:\d{2}$/;

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function selectFromSchedule(allClasses) {
  console.log('Enter the numbers of classes you want to auto-register for.');
  console.log('Separate with commas (e.g., 1,3,5,12).\n');

  const selection = await ask('Select classes: ');
  const selectedNums = selection.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

  return selectedNums
    .map(n => allClasses.find(c => c.idx === n))
    .filter(Boolean)
    .map(c => ({ day: c.dayName, time: c.time, name: c.name }));
}

async function enterManually() {
  console.log('Enter your classes one by one. Type "done" when finished.\n');

  const classes = [];
  let i = 1;
  while (true) {
    console.log(`Class ${i}:`);
    const dayInput = await ask('  Day (e.g., sunday): ');
    if (dayInput.trim().toLowerCase() === 'done') break;

    const day = dayInput.trim().toLowerCase();
    if (!DAYS.includes(day)) {
      console.log(`  "${dayInput.trim()}" is not a valid day. Try again.\n`);
      continue;
    }

    const time = await ask('  Time (e.g., 07:00): ');
    if (!VALID_TIME.test(time.trim())) {
      console.log(`  "${time.trim()}" is not a valid time. Use HH:MM format (e.g., 07:00). Try again.\n`);
      continue;
    }

    const name = await ask('  Class name (optional, press Enter to skip): ');

    const entry = { day, time: time.trim() };
    if (name.trim()) entry.name = name.trim();
    classes.push(entry);
    console.log();
    i++;
  }
  return classes;
}

async function main() {
  console.log('\n=== Arbox Auto-Register Setup ===\n');

  const email = await ask('Arbox email: ');
  const password = await ask('Arbox password: ');

  console.log('\nLogging in...');
  let auth;
  try {
    auth = await login(email, password);
  } catch (err) {
    console.error(`Login failed: ${err.message}`);
    process.exit(1);
  }
  console.log(`Logged in as ${auth.userName} (gym ID: ${auth.boxId})\n`);

  const membershipUserId = await getMembership(auth);

  const today = new Date();
  const from = today.toISOString().split('T')[0];
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 7);
  const to = endDate.toISOString().split('T')[0];

  console.log(`Fetching schedule for ${from} → ${to}...\n`);
  const schedule = await getSchedule(auth, from, to);

  // Group and display schedule
  const grouped = {};
  for (const entry of schedule) {
    const date = entry.date;
    const dayName = DAYS[new Date(date + 'T12:00:00').getDay()];
    if (!grouped[date]) grouped[date] = { dayName, classes: [] };
    grouped[date].classes.push(entry);
  }

  const allClasses = [];
  let idx = 1;

  if (Object.keys(grouped).length > 0) {
    console.log('Available classes:\n');
    for (const [date, { dayName, classes }] of Object.entries(grouped).sort()) {
      console.log(`  ${dayName.toUpperCase()} (${date}):`);
      for (const c of classes.sort((a, b) => a.time.localeCompare(b.time))) {
        const name = c.box_categories?.name || 'Unknown';
        const coach = c.coach?.full_name || 'TBD';
        const spots = c.free ?? '?';
        const booked = c.user_booked ? ' [BOOKED]' : '';
        console.log(`    ${idx}. ${c.time} ${name} — ${coach} (${spots} spots)${booked}`);
        allClasses.push({ idx, date, dayName, time: c.time.substring(0, 5), name, coach, entry: c });
        idx++;
      }
      console.log();
    }
  } else {
    console.log('No classes found in the schedule for the next 7 days.\n');
  }

  // Choose selection method
  let selectedClasses;

  if (allClasses.length > 0) {
    console.log('How do you want to select classes?');
    console.log('  1. Pick from the schedule above (by number)');
    console.log('  2. Enter day + time manually\n');
    const method = await ask('Choose 1 or 2: ');

    if (method.trim() === '2') {
      selectedClasses = await enterManually();
    } else {
      selectedClasses = await selectFromSchedule(allClasses);
    }
  } else {
    console.log('You can enter your classes manually by day and time.\n');
    selectedClasses = await enterManually();
  }

  if (selectedClasses.length === 0) {
    console.log('No classes selected. Exiting.');
    process.exit(0);
  }

  // Registration schedule
  console.log('\n--- Registration schedule ---\n');
  console.log('When does your gym open registration for next week?\n');

  const regDayInput = await ask('Registration day (e.g., thursday, or press Enter for every day): ');
  const regDay = regDayInput.trim().toLowerCase();

  if (regDay && !DAYS.includes(regDay)) {
    console.log(`Warning: "${regDay}" is not a valid day. Running every day instead.`);
  }

  const regTimeInput = await ask('Registration time in HH:MM (or press Enter for 15:00): ');
  const regTime = regTimeInput.trim() || '15:00';

  if (!VALID_TIME.test(regTime)) {
    console.log(`Warning: "${regTime}" is not a valid time. Using 15:00 instead.`);
  }

  const validRegTime = VALID_TIME.test(regTime) ? regTime : '15:00';
  const validRegDay = regDay && DAYS.includes(regDay) ? regDay : null;

  // Build config
  const config = {
    ...(validRegDay ? { registrationDay: validRegDay } : {}),
    registrationTime: validRegTime,
    classes: selectedClasses,
  };

  const configPath = new URL('../config.json', import.meta.url);
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(`\nSaved ${config.classes.length} classes to config.json:`);
  for (const c of config.classes) {
    console.log(`  ${c.day} ${c.time}${c.name ? ` — ${c.name}` : ''}`);
  }

  const envPath = new URL('../.env', import.meta.url);
  writeFileSync(envPath, `ARBOX_EMAIL=${email}\nARBOX_PASSWORD=${password}\n`);
  console.log('\nSaved credentials to .env');

  console.log('\n=== Next Steps ===');
  console.log('1. Test locally:   ARBOX_FORCE_RUN=true npm run register');
  console.log('2. Push to GitHub and add these secrets:');
  console.log(`   ARBOX_EMAIL     = ${email}`);
  console.log(`   ARBOX_PASSWORD  = (your password)`);
  console.log(`   ARBOX_CONFIG    = ${JSON.stringify(config)}`);
  const dayMsg = validRegDay ? `every ${validRegDay}` : 'every day';
  console.log(`3. GitHub Actions will run ${dayMsg} at ${validRegTime} Israel time.\n`);

  rl.close();
}

main().catch(err => {
  console.error(`Error: ${err.message}`);
  rl.close();
  process.exit(1);
});
