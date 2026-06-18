# Arbox Auto-Register

Automatically sign up for your weekly fitness classes on [Arbox](https://www.arboxapp.com) the moment registration opens. No more racing to grab a spot — the script does it for you.

## How It Works

A free scheduling service called **[cron-job.org](https://cron-job.org)** triggers a **GitHub Actions** workflow at the exact day and time your gym opens registration. The workflow:
1. Logs into your Arbox account
2. Checks the gym schedule for the next 7 days
3. Finds the classes you picked (by day and time — class name is optional)
4. Signs you up for each one — or joins the waitlist if the class is full
5. Skips classes you're already signed up for
6. Sends you an email summary (optional)

---

## What You Need

Before you start, you need to install two free programs on your computer and have two accounts ready.

### 1. Node.js

Node.js is the engine that runs the script. You need version 18 or higher.

**Mac:** Go to [nodejs.org](https://nodejs.org/), download the **macOS Installer**, open the downloaded file, and follow the steps.

**Windows:** Go to [nodejs.org](https://nodejs.org/), download the **Windows Installer (.msi)**, open the downloaded file, and click **Next** until it finishes.

To check that it worked, open a terminal (see below) and type:
```
node --version
```
You should see something like `v22.x.x`. Any number 18 or higher means you're good.

### 2. Git

Git lets you download the project files from GitHub.

**Mac:** Open Terminal and type `git --version`. If you see a version number, you're good. If a popup appears asking you to install "command line developer tools", click **Install** and wait for it to finish.

**Windows:** Go to [git-scm.com](https://git-scm.com/), click the download button, run the installer, and click **Next** on every screen.

### 3. A GitHub Account (free)

GitHub is where the automatic weekly registration runs. If you don't have an account, go to [github.com/join](https://github.com/join) and sign up — it's free.

### 4. An Arbox Account

You need an active gym membership linked to Arbox. This is the same email and password you use to log into the Arbox phone app.

### How to Open a Terminal

A terminal is a window where you type commands. You'll use it in the next steps.

- **Mac:** Open the app called **Terminal**. You can find it in Applications > Utilities, or press `Cmd + Space` and search for "Terminal".
- **Windows:** Press the `Windows` key, type **PowerShell**, and press Enter.

---

## Setup (Step by Step)

### Step 1: Fork the Repository

"Forking" means making your own copy of this project on GitHub. You need your own copy so you can store your personal settings there.

1. Make sure you're logged into [github.com](https://github.com)
2. Go to this project's page on GitHub
3. Click the **Fork** button in the top-right corner
4. On the next page, click **Create fork**
5. Done! You now have your own copy at `github.com/YOUR_USERNAME/arbox-auto-register`

### Step 2: Download and Run the Setup Wizard

Open your terminal and type these commands, one at a time. Press Enter after each one.

```
git clone https://github.com/YOUR_USERNAME/arbox-auto-register.git
cd arbox-auto-register
npm install
npm run setup
```

> **Important:** Replace `YOUR_USERNAME` with your actual GitHub username. For example, if your username is `dana123`, the first command would be:
> ```
> git clone https://github.com/dana123/arbox-auto-register.git
> ```

The setup wizard will:
1. Ask for your **Arbox email** and **password** (if you've run it before, it will offer to reuse saved credentials)
2. Log in and check that your details are correct
3. Show you the full class schedule for the next 7 days
4. Let you choose how to select classes:
   - **Option 1:** Pick from the schedule by number (for example: `1,3,5`)
   - **Option 2:** Enter day + time manually (useful if the schedule isn't published yet)
5. Ask which **day** and **time** your gym opens registration (for example: `thursday` at `15:00`)
6. Save your choices to two files on your computer:
   - `config.json` — the classes you picked, registration day, and registration time
   - `.env` — your login details (this file stays on your computer and is never uploaded)

**Here's what it looks like:**
```
=== Arbox Auto-Register Setup ===

Arbox email: you@example.com
Arbox password: ********

Logging in...
Logged in as John Doe (gym ID: 80)

Fetching schedule for 2026-06-14 → 2026-06-21...

Available classes:

  SUNDAY (2026-06-15):
    1. 06:00 CrossFit — Coach A (8 spots)
    2. 07:00 CrossFit — Coach B (12 spots)
    3. 08:00 Open Gym — Coach C (20 spots)
    4. 18:30 CrossFit — Coach A (5 spots)

  MONDAY (2026-06-16):
    5. 06:00 CrossFit — Coach B (10 spots)
    6. 07:00 WOD — Coach A (8 spots)
    ...

How do you want to select classes?
  1. Pick from the schedule above (by number)
  2. Enter day + time manually
Choose 1 or 2: 1

Select classes: 2,4,6

--- Registration schedule ---

When does your gym open registration for next week?

Registration day (e.g., thursday, or press Enter for every day): thursday
Registration time in HH:MM (or press Enter for 15:00): 15:00
```

### Step 3: Push Your Config to GitHub

After the wizard saves `config.json`, push it to your repo:

```
git add config.json
git commit -m "Add my class schedule"
git push
```

### Step 4: Test It

Run this command to make sure everything works:

**Mac / Linux:**
```
ARBOX_FORCE_RUN=true npm run register
```

**Windows (PowerShell):**
```
$env:ARBOX_FORCE_RUN="true"; npm run register
```

> The `ARBOX_FORCE_RUN` part tells the script to run right now, even if today isn't your registration day. You only need this for testing — the automatic runs handle it on their own.

You should see something like:
```
=== Arbox Auto-Register ===
Time: 14/06/2026, 15:00:00

Logging in as you@example.com...
Logged in as John Doe (box: 80)
Membership ID: 54321

Fetching schedule 2026-06-14 → 2026-06-21...
Found 42 classes in schedule

[REGISTERED] CrossFit — 2026-06-15 07:00 (Coach B)
[OK] Already registered: CrossFit — 2026-06-15 18:30 (Coach A)
[SKIP] WOD — 2026-06-22 07:00 (Coach A): registration not open yet
[FULL] HIIT — 2026-06-17 08:00 (Coach C): class is full

=== Summary ===
  registered: 1
  already_registered: 1
  not_yet_open: 1
  full: 1
```

### Step 5: Add Your Secrets to GitHub

Now you need to give GitHub your login details so it can run the script automatically. Don't worry — your details are **encrypted** (protected with a secret code) and nobody can see them, not even GitHub.

1. Go to your forked repo on GitHub: `github.com/YOUR_USERNAME/arbox-auto-register`
2. Click the **Settings** tab at the top of the page
3. On the left side, click **Secrets and variables**, then click **Actions**
4. Click the green **New repository secret** button

You need to add **two** secrets. After adding the first, click **Add secret** and then click **New repository secret** again for the second.

**Secret 1:**
- **Name:** `ARBOX_EMAIL`
- **Secret:** Your Arbox email address (example: `you@example.com`)

**Secret 2:**
- **Name:** `ARBOX_PASSWORD`
- **Secret:** Your Arbox password

### Step 6: Create a GitHub Personal Access Token

You need a token so the scheduling service can trigger your workflow.

1. Go to [github.com/settings/tokens/new](https://github.com/settings/tokens/new) (classic token)
2. Fill in:
   - **Note:** `arbox-cron-trigger`
   - **Expiration:** 1 year (you'll need to regenerate it when it expires)
   - **Scopes:** check only **`repo`**
3. Click **Generate token**
4. Copy the token (starts with `ghp_...`) — you won't see it again

**Test it** by opening your terminal and running (replace `YOUR_TOKEN` with the actual token and `YOUR_USERNAME` with your GitHub username):
```
curl -s -o /dev/null -w "%{http_code}" -X POST \
  -H "Accept: application/vnd.github+v3+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/arbox-auto-register/actions/workflows/register.yml/dispatches \
  -d '{"ref":"main"}'
```

You should see `204`. Check the **Actions** tab in your repo to confirm a new run appeared.

### Step 7: Set Up the Automatic Trigger (cron-job.org)

[cron-job.org](https://cron-job.org) is a free service that sends an HTTP request at a precise time. We use it to trigger the GitHub Actions workflow at the exact moment registration opens.

1. Go to [cron-job.org](https://cron-job.org) and **sign up** (free)
2. Confirm your email
3. Click **Create cronjob**
4. Fill in the basic settings:
   - **Title:** `Arbox Register`
   - **URL:** `https://api.github.com/repos/YOUR_USERNAME/arbox-auto-register/actions/workflows/register.yml/dispatches`
5. Under **Schedule**, select **Custom**:
   - **Timezone:** `Asia/Jerusalem`
   - **Days of week:** only your registration day (e.g., **Thursday**)
   - **Hours:** only your registration hour (e.g., **15**)
   - **Minutes:** only **0**
6. Expand **Advanced** settings:
   - **Request method:** `POST`
   - **Request body:** `{"ref":"main"}`
   - **Headers** — add these three:

     | Key | Value |
     |-----|-------|
     | `Accept` | `application/vnd.github+v3+json` |
     | `Authorization` | `Bearer YOUR_TOKEN` (the token from Step 6) |
     | `Content-Type` | `application/json` |

7. Click **Create** / **Save**
8. Click **Test run** — you should see a successful response (status 204)
9. Check the **Actions** tab in your repo to confirm the test triggered a run

That's it! Every week at your configured day and time, cron-job.org will trigger the workflow and registration will happen within seconds.

---

## Email Notifications (Optional)

Want to get an email summary after each registration run? You just need to generate an app password for your email.

**For Yahoo:**
1. Go to [Yahoo Account Security](https://login.yahoo.com/account/security)
2. Scroll to "Generate app password"
3. Select "Other app", name it anything (e.g., "Arbox"), click **Generate**
4. Copy the generated password

**For Gmail:**
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Name it anything (e.g., "Arbox"), click **Create**
3. Copy the generated password

Then add it as a GitHub secret:
- **Name:** `ARBOX_EMAIL_APP_PASSWORD`
- **Secret:** The app password you just generated

That's it! You'll now get an email after each registration with a summary of what happened.

If you don't set this secret, everything still works — you just won't get email notifications.

---

## Changing Your Classes

Want to sign up for different classes? Here's how.

### Option A: Run the Setup Wizard Again

Open your terminal and type:
```
cd arbox-auto-register
npm run setup
```

The wizard will show your current config and ask what you'd like to change. After saving, push the updated config to GitHub:
```
git add config.json
git commit -m "Update classes"
git push
```

### Option B: Edit config.json Directly on GitHub

1. Go to your repo on GitHub
2. Click on `config.json`
3. Click the pencil icon (edit) in the top right
4. Make your changes
5. Click **Commit changes**

### Option C: Edit config.json Locally

Open `config.json` in any text editor (Notepad, TextEdit, or VS Code) and change it:
```json
{
  "registrationDay": "thursday",
  "registrationTime": "15:00",
  "classes": [
    { "day": "sunday", "time": "07:00", "name": "CrossFit" },
    { "day": "tuesday", "time": "18:30" }
  ]
}
```

Then push to GitHub:
```
git add config.json
git commit -m "Update classes"
git push
```

### What the Fields Mean

| Field | Required? | What to Write | Example |
|-------|-----------|---------------|---------|
| `registrationDay` | Optional | The day your gym opens registration. If not set, the script runs every day. | `thursday` |
| `registrationTime` | Optional | What time registration opens, in HH:MM. Defaults to `15:00`. | `06:00`, `15:00` |
| `day` | Yes | Day of the week in English, all lowercase | `sunday`, `monday`, `tuesday` |
| `time` | Yes | Class start time, exactly as shown in Arbox | `07:00`, `18:30` |
| `name` | Optional | Class type name — a partial match is enough. If not set, day + time is used to find the class. | `CrossFit` also matches "crossfit" and "CrossFit WOD" |

---

## Running on Your Own Computer (Advanced)

If you prefer not to use GitHub Actions, you can set up the script to run automatically on your own computer every week.

### Mac (using launchd)

Create the file `~/Library/LaunchAgents/com.arbox-register.plist` with this content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.arbox-register</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/node</string>
        <string>/path/to/arbox-auto-register/src/register.mjs</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/path/to/arbox-auto-register</string>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Weekday</key>
        <integer>4</integer>
        <key>Hour</key>
        <integer>15</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/path/to/arbox-auto-register/logs/stdout.log</string>
    <key>StandardErrorPath</key>
    <string>/path/to/arbox-auto-register/logs/stderr.log</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    </dict>
</dict>
</plist>
```

Replace every `/path/to/arbox-auto-register` with the real path on your computer. Then run:

```
launchctl load ~/Library/LaunchAgents/com.arbox-register.plist
```

> **Note:** The Node.js path (`/opt/homebrew/bin/node`) might be different on your Mac. Run `which node` to find yours.

### Windows (using Task Scheduler)

1. Press the `Windows` key and search for **Task Scheduler** — open it
2. Click **Create Basic Task** on the right side
3. Name it `Arbox Auto-Register` and click **Next**
4. Select **Weekly** and click **Next**
5. Set it to run every **Thursday** at **15:00** (3:00 PM) and click **Next**
6. Select **Start a Program** and click **Next**
7. Fill in:
   - **Program:** `node` (or the full path — run `where node` in PowerShell to find it)
   - **Arguments:** `src/register.mjs`
   - **Start in:** the full path to your `arbox-auto-register` folder (for example: `C:\Users\YourName\arbox-auto-register`)
8. Click **Finish**

### Linux (using cron)

Run `crontab -e` and add this line (change the path to match yours):
```
0 15 * * 4 cd /path/to/arbox-auto-register && /usr/bin/node src/register.mjs >> logs/stdout.log 2>&1
```

---

## Timezone and Daylight Saving

Israel switches between winter time (IST, UTC+2) and summer time (IDT, UTC+3). cron-job.org supports the `Asia/Jerusalem` timezone natively, so daylight saving is handled automatically — the trigger always fires at your configured local time regardless of the season.

---

## Troubleshooting

**"inCorrectLoginDetails"**
Your email or password is wrong. Try logging into the [Arbox website](https://www.arboxapp.com/client-login) with the same email and password to make sure they work.

**"No gym (box) found on your account"**
Your Arbox account isn't connected to a gym. Contact your gym and ask them to link your account in Arbox.

**"No active membership found"**
Your gym membership may have expired. Check your membership status in the Arbox app.

**"No class found: CrossFit on sunday at 07:00"**
The class name, time, or day doesn't match what's in the schedule. Common reasons:
- The class has a different name in Arbox (for example, "WOD" instead of "CrossFit"). Run `npm run setup` to see the exact names.
- The time format is wrong — always use two digits for hours, like `07:00` (not `7:00`).
- The gym hasn't published next week's schedule yet.

**"registration not open yet"**
The gym has published the schedule but hasn't opened registration for that class yet. This is normal — the script will register once registration opens at your configured time.

**"class is full"**
The script tries to join the waitlist automatically. If that works, you'll see `[WAITLIST]`. If not, you'll see `[FULL]`. Check the Arbox app for waitlist options.

**cron-job.org trigger failed**
Check your cron-job.org dashboard for the execution history. Common issues:
- The GitHub token expired — regenerate it (Step 6) and update the `Authorization` header in cron-job.org.
- The response status is not 204 — verify the URL includes your correct GitHub username and the three required headers (`Accept`, `Authorization`, `Content-Type`) are set.

**GitHub Actions runs but nothing happens**
- Make sure both secrets (`ARBOX_EMAIL`, `ARBOX_PASSWORD`) are set correctly.
- Check that `config.json` exists in your repo with valid class entries.

---

## FAQ

**Is my password safe?**
Yes. On GitHub, your credentials are stored as [encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) — they're protected and never shown in logs. On your computer, they're saved in a `.env` file that is never uploaded to GitHub.

**What if the gym hasn't published next week's schedule yet?**
The script will show `[SKIP] registration not open yet` for those classes. This is normal — registration will happen automatically once your gym opens it.

**Can I register for the same class type at different times?**
Yes! Just add multiple entries with the same class name but different times. For example, CrossFit at 07:00 and CrossFit at 18:30.

**How do I change my class schedule?**
The easiest way: edit `config.json` directly on GitHub (click the file, then the pencil icon). Or run `npm run setup` locally and push the updated config.

**Does it work with multiple gym locations?**
Currently it uses the first location on your account. If you need a specific location, open an issue on GitHub.

---

## Project Structure

```
arbox-auto-register/
├── src/
│   ├── arbox-client.mjs   # Arbox API client (login, schedule, register)
│   ├── register.mjs       # Main script — finds and registers for classes
│   ├── setup.mjs          # Interactive setup wizard
│   └── notify.mjs         # Email notification sender (optional)
├── .github/workflows/
│   └── register.yml       # GitHub Actions workflow (triggered by cron-job.org)
├── config.json            # Your class schedule (edit this to change classes)
├── config.example.json    # Example config for reference
├── .env.example           # Example credentials file
├── package.json
└── README.md
```

## License

MIT
