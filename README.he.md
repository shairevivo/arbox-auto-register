<div dir="rtl">

# Arbox Auto-Register — הרשמה אוטומטית

הרשמה אוטומטית לשיעורי כושר שבועיים ב-[Arbox](https://www.arboxapp.com) ברגע שההרשמה נפתחת. בלי לרוץ לתפוס מקום — הסקריפט עושה את זה בשבילך.

## איך זה עובד

שירות תזמון חינמי בשם **[cron-job.org](https://cron-job.org)** מפעיל תהליך **GitHub Actions** בדיוק ביום ובשעה שבהם חדר הכושר פותח הרשמה. התהליך:

1. מתחבר לחשבון Arbox שלך
2. בודק את לוח השיעורים ל-7 ימים הקרובים
3. מוצא את השיעורים שבחרת (לפי יום ושעה — שם השיעור הוא אופציונלי)
4. רושם אותך לכל אחד מהם — או מצטרף לרשימת המתנה אם השיעור מלא
5. מדלג על שיעורים שכבר נרשמת אליהם
6. שולח לך סיכום במייל (אופציונלי)

---

## מה צריך לפני שמתחילים

צריך להתקין שתי תוכנות חינמיות על המחשב, ולוודא שיש לכם שני חשבונות מוכנים.

### 1. Node.js

Node.js הוא המנוע שמריץ את הסקריפט. צריך גרסה 18 ומעלה.

**מק:** היכנסו ל-[nodejs.org](https://nodejs.org/), הורידו את ה-**macOS Installer**, פתחו את הקובץ שירד ועקבו אחרי ההוראות.

**ווינדוס:** היכנסו ל-[nodejs.org](https://nodejs.org/), הורידו את ה-**Windows Installer (.msi)**, פתחו את הקובץ שירד ולחצו **Next** עד שזה נגמר.

כדי לבדוק שזה עבד, פתחו טרמינל (ראו למטה) והקלידו:

<div dir="ltr">

```
node --version
```

</div>

אתם צריכים לראות משהו כמו `v22.x.x`. כל מספר 18 ומעלה אומר שהכל בסדר.

### 2. Git

Git מאפשר להוריד את קבצי הפרויקט מ-GitHub.

**מק:** פתחו טרמינל והקלידו `git --version`. אם מופיע מספר גרסה, הכל בסדר. אם קופצת הודעה שמבקשת להתקין "command line developer tools", לחצו **Install** וחכו שזה יסתיים.

**ווינדוס:** היכנסו ל-[git-scm.com](https://git-scm.com/), לחצו על כפתור ההורדה, הריצו את ההתקנה ולחצו **Next** בכל מסך.

### 3. חשבון GitHub (חינם)

GitHub הוא המקום שבו ההרשמה האוטומטית רצה כל שבוע. אם אין לכם חשבון, היכנסו ל-[github.com/join](https://github.com/join) והירשמו — זה חינם.

### 4. חשבון Arbox

צריך מנוי פעיל לחדר כושר שמקושר ל-Arbox. זה אותו מייל וסיסמה שאתם משתמשים בהם באפליקציית Arbox בטלפון.

### איך פותחים טרמינל

טרמינל זה חלון שבו מקלידים פקודות. תשתמשו בו בצעדים הבאים.

- **מק:** פתחו את האפליקציה **Terminal**. אפשר למצוא אותה ב-Applications > Utilities, או ללחוץ `Cmd + Space` ולחפש "Terminal".
- **ווינדוס:** לחצו על מקש `Windows`, הקלידו **PowerShell** ולחצו Enter.

---

## התקנה (צעד אחר צעד)

### צעד 1: Fork של הריפו

"Fork" זה ליצור עותק אישי שלכם מהפרויקט ב-GitHub. אתם צריכים עותק משלכם כדי לשמור בו את ההגדרות האישיות שלכם.

1. ודאו שאתם מחוברים ל-[github.com](https://github.com)
2. היכנסו לדף הפרויקט ב-GitHub
3. לחצו על כפתור **Fork** בפינה הימנית-עליונה
4. בדף הבא, לחצו על **Create fork**
5. מוכן! עכשיו יש לכם עותק משלכם בכתובת `github.com/YOUR_USERNAME/arbox-auto-register`

### צעד 2: הורדה והרצת אשף ההגדרות

פתחו את הטרמינל והקלידו את הפקודות האלה, אחת אחרי השנייה. לחצו Enter אחרי כל אחת.

<div dir="ltr">

```
git clone https://github.com/YOUR_USERNAME/arbox-auto-register.git
cd arbox-auto-register
npm install
npm run setup
```

</div>

> **חשוב:** החליפו את `YOUR_USERNAME` בשם המשתמש שלכם ב-GitHub. למשל, אם שם המשתמש שלכם הוא `dana123`, הפקודה הראשונה תהיה:
> ```
> git clone https://github.com/dana123/arbox-auto-register.git
> ```

האשף:

1. ישאל את **כתובת המייל והסיסמה** שלכם ב-Arbox (אם כבר הרצתם פעם, הוא יציע להשתמש בפרטים השמורים)
2. יתחבר ויבדוק שהפרטים נכונים
3. יציג את **לוח השיעורים המלא** ל-7 ימים הקרובים
4. יאפשר לכם לבחור שיעורים בשתי דרכים:
   - **אפשרות 1:** לבחור מהלוח לפי מספר (למשל: `1,3,5`)
   - **אפשרות 2:** להקליד יום + שעה ידנית (שימושי אם הלוח עדיין לא פורסם)
5. ישאל **באיזה יום ובאיזו שעה** חדר הכושר פותח הרשמה (למשל: `thursday` בשעה `15:00`)
6. ישמור את הבחירות שלכם בשני קבצים על המחשב:
   - `config.json` — השיעורים שבחרתם, יום ההרשמה ושעת ההרשמה
   - `.env` — פרטי ההתחברות שלכם (הקובץ הזה נשאר על המחשב ולעולם לא עולה לשום מקום)

**ככה זה נראה:**

<div dir="ltr">

```
=== Arbox Auto-Register Setup ===

Arbox email: you@example.com
Arbox password: ********

Logging in...
Logged in as Israel Israeli (gym ID: 80)

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

</div>

### צעד 3: דחיפת ההגדרות ל-GitHub

אחרי שהאשף שומר את `config.json`, דחפו אותו לריפו שלכם:

<div dir="ltr">

```
git add config.json
git commit -m "Add my class schedule"
git push
```

</div>

### צעד 4: בדיקה

הריצו את הפקודה הזו כדי לוודא שהכל עובד:

**מק / לינוקס:**

<div dir="ltr">

```
ARBOX_FORCE_RUN=true npm run register
```

</div>

**ווינדוס (PowerShell):**

<div dir="ltr">

```
$env:ARBOX_FORCE_RUN="true"; npm run register
```

</div>

> החלק `ARBOX_FORCE_RUN` אומר לסקריפט לרוץ עכשיו, גם אם היום הוא לא יום ההרשמה שלכם. צריך את זה רק לבדיקות — ההרצות האוטומטיות מטפלות בזה לבד.

אתם צריכים לראות משהו כזה:

<div dir="ltr">

```
=== Arbox Auto-Register ===
Time: 14/06/2026, 15:00:00

Logging in as you@example.com...
Logged in as Israel Israeli (box: 80)
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

</div>

אם אתם רואים `[REGISTERED]` או `[OK]`, זה עובד.

### צעד 5: הוספת Secrets ב-GitHub

עכשיו צריך לתת ל-GitHub את פרטי ההתחברות שלכם כדי שהוא יוכל להריץ את הסקריפט אוטומטית. אל דאגה — הפרטים שלכם **מוצפנים** (מוגנים בקוד סודי) ואף אחד לא יכול לראות אותם, אפילו לא GitHub.

1. היכנסו לריפו שלכם ב-GitHub:&rlm; `github.com/YOUR_USERNAME/arbox-auto-register`
2. לחצו על טאב **Settings** בחלק העליון של הדף
3. בצד שמאל, לחצו על **Secrets and variables**, ואז לחצו על **Actions**
4. לחצו על הכפתור הירוק **New repository secret**

צריך להוסיף **שניים** secrets. אחרי הראשון, לחצו **Add secret** ואז לחצו שוב על **New repository secret** בשביל השני.

**Secret 1:**
- **Name:**&rlm; `ARBOX_EMAIL`
- **Secret:** כתובת המייל שלכם ב-Arbox (למשל:&rlm; `you@example.com`)

**Secret 2:**
- **Name:**&rlm; `ARBOX_PASSWORD`
- **Secret:** הסיסמה שלכם ב-Arbox

### צעד 6: יצירת GitHub Personal Access Token

צריך טוקן (מפתח גישה) כדי ששירות התזמון יוכל להפעיל את התהליך.

1. היכנסו ל-[github.com/settings/tokens/new](https://github.com/settings/tokens/new) (טוקן קלאסי)
2. מלאו:
   - **Note:**&rlm; `arbox-cron-trigger`
   - **Expiration:** שנה (תצטרכו לחדש אותו כשיפוג)
   - **Scopes:** סמנו רק **`repo`**
3. לחצו **Generate token**
4. העתיקו את הטוקן (מתחיל ב-`ghp_...`) — לא תוכלו לראות אותו שוב

**בדיקה** — פתחו טרמינל והריצו (החליפו `YOUR_TOKEN` בטוקן ו-`YOUR_USERNAME` בשם המשתמש שלכם):

<div dir="ltr">

```
curl -s -o /dev/null -w "%{http_code}" -X POST \
  -H "Accept: application/vnd.github+v3+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/arbox-auto-register/actions/workflows/register.yml/dispatches \
  -d '{"ref":"main"}'
```

</div>

אתם צריכים לראות `204`. בדקו בטאב **Actions** בריפו שהופיעה הרצה חדשה.

### צעד 7: הגדרת הטריגר האוטומטי (cron-job.org)

[cron-job.org](https://cron-job.org) הוא שירות חינמי ששולח בקשת HTTP בזמן מדויק. אנחנו משתמשים בו כדי להפעיל את תהליך ה-GitHub Actions ברגע שההרשמה נפתחת.

1. היכנסו ל-[cron-job.org](https://cron-job.org) ו**הירשמו** (חינם)
2. אשרו את המייל
3. לחצו **Create cronjob**
4. מלאו את ההגדרות הבסיסיות:
   - **Title:**&rlm; `Arbox Register`
   - **URL:**&rlm; `https://api.github.com/repos/YOUR_USERNAME/arbox-auto-register/actions/workflows/register.yml/dispatches`
5. תחת **Schedule**, בחרו **Custom**:
   - **Timezone:**&rlm; `Asia/Jerusalem`
   - **Days of week:** רק יום ההרשמה שלכם (למשל **Thursday**)
   - **Hours:** רק שעת ההרשמה (למשל **15**)
   - **Minutes:** רק **0**
6. פתחו את **Advanced**:
   - **Request method:**&rlm; `POST`
   - **Request body:**&rlm; `{"ref":"main"}`
   - **Headers** — הוסיפו שלושה:

     | Key | Value |
     |-----|-------|
     | `Accept` | `application/vnd.github+v3+json` |
     | `Authorization` | `Bearer YOUR_TOKEN` (הטוקן מצעד 6) |
     | `Content-Type` | `application/json` |

7. לחצו **Create** / **Save**
8. לחצו **Test run** — אתם צריכים לראות תגובה מוצלחת (סטטוס 204)
9. בדקו בטאב **Actions** בריפו שהבדיקה הפעילה הרצה

זהו! כל שבוע ביום ובשעה שהגדרתם, cron-job.org יפעיל את התהליך וההרשמה תקרה תוך שניות.

---

## התראות במייל (אופציונלי)

רוצים לקבל סיכום במייל אחרי כל הרצה? צריך רק ליצור סיסמת אפליקציה למייל שלכם.

**ל-Yahoo:**
1. היכנסו ל-[אבטחת חשבון Yahoo](https://login.yahoo.com/account/security)
2. גללו ל-"Generate app password"
3. בחרו "Other app", תנו שם כלשהו (למשל "Arbox"), לחצו **Generate**
4. העתיקו את הסיסמה שנוצרה

**ל-Gmail:**
1. היכנסו ל-[סיסמאות אפליקציה של Google](https://myaccount.google.com/apppasswords)
2. תנו שם כלשהו (למשל "Arbox"), לחצו **Create**
3. העתיקו את הסיסמה שנוצרה

ואז הוסיפו אותה כ-secret ב-GitHub:
- **Name:**&rlm; `ARBOX_EMAIL_APP_PASSWORD`
- **Secret:** סיסמת האפליקציה שיצרתם

זהו! מעכשיו תקבלו מייל אחרי כל הרשמה עם סיכום של מה שקרה.

אם לא מגדירים את ה-secret הזה, הכל עדיין עובד — פשוט לא תקבלו התראות במייל.

---

## שינוי השיעורים

רוצים להירשם לשיעורים אחרים? ככה עושים את זה.

### אפשרות א׳: להריץ את אשף ההגדרות מחדש

פתחו את הטרמינל והקלידו:

<div dir="ltr">

```
cd arbox-auto-register
npm run setup
```

</div>

האשף יציג את ההגדרות הנוכחיות וישאל מה תרצו לשנות. אחרי השמירה, דחפו את ההגדרות המעודכנות ל-GitHub:

<div dir="ltr">

```
git add config.json
git commit -m "Update classes"
git push
```

</div>

### אפשרות ב׳: לערוך את config.json ישירות ב-GitHub

1. היכנסו לריפו שלכם ב-GitHub
2. לחצו על `config.json`
3. לחצו על אייקון העיפרון (עריכה) למעלה מימין
4. שנו את מה שצריך
5. לחצו על **Commit changes**

### אפשרות ג׳: לערוך את config.json מקומית

פתחו את `config.json` בעורך טקסט כלשהו (Notepad, TextEdit או VS Code) ושנו:

<div dir="ltr">

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

</div>

ואז דחפו ל-GitHub:

<div dir="ltr">

```
git add config.json
git commit -m "Update classes"
git push
```

</div>

### מה כל שדה אומר

| שדה | חובה? | מה לכתוב | דוגמה |
|-----|-------|-----------|-------|
| `registrationDay` | אופציונלי | היום שבו חדר הכושר פותח הרשמה. אם לא מוגדר, הסקריפט רץ כל יום. | `thursday` |
| `registrationTime` | אופציונלי | באיזו שעה ההרשמה נפתחת, בפורמט HH:MM. ברירת מחדל: `15:00`. | `06:00`&rlm;, `15:00` |
| `day` | כן | יום בשבוע באנגלית, באותיות קטנות | `sunday`&rlm;, `monday`&rlm;, `tuesday` |
| `time` | כן | שעת התחלת השיעור, בדיוק כפי שמופיעה ב-Arbox | `07:00`&rlm;, `18:30` |
| `name` | אופציונלי | שם סוג השיעור — מספיקה התאמה חלקית. אם לא מוגדר, יום + שעה מספיקים לזיהוי השיעור. | `CrossFit` מתאים גם ל-"crossfit" ול-"CrossFit WOD" |

---

## הרצה על המחשב שלכם (מתקדם)

אם אתם מעדיפים לא להשתמש ב-GitHub Actions, אפשר להגדיר את הסקריפט לרוץ אוטומטית על המחשב שלכם כל שבוע.

### מק (באמצעות launchd)

צרו את הקובץ `~/Library/LaunchAgents/com.arbox-register.plist` עם התוכן הבא:

<div dir="ltr">

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

</div>

החליפו כל `/path/to/arbox-auto-register` בנתיב האמיתי על המחשב שלכם. אחר כך הריצו:

<div dir="ltr">

```
launchctl load ~/Library/LaunchAgents/com.arbox-register.plist
```

</div>

> **הערה:** הנתיב של Node.js&rlm; (`/opt/homebrew/bin/node`) יכול להיות שונה אצלכם. הריצו `which node` כדי למצוא את הנתיב.

### ווינדוס (באמצעות Task Scheduler)

1. לחצו על מקש `Windows` וחפשו **Task Scheduler** — פתחו אותו
2. לחצו על **Create Basic Task** בצד ימין
3. תנו את השם `Arbox Auto-Register` ולחצו **Next**
4. בחרו **Weekly** ולחצו **Next**
5. הגדירו שירוץ כל **Thursday** (יום חמישי) בשעה **15:00** ולחצו **Next**
6. בחרו **Start a Program** ולחצו **Next**
7. מלאו:
   - **Program:**&rlm; `node` (או הנתיב המלא — הריצו `where node` ב-PowerShell כדי למצוא)
   - **Arguments:**&rlm; `src/register.mjs`
   - **Start in:** הנתיב המלא לתיקייה `arbox-auto-register` (למשל:&rlm; `C:\Users\YourName\arbox-auto-register`)
8. לחצו **Finish**

### לינוקס (באמצעות cron)

הריצו `crontab -e` והוסיפו את השורה (שנו את הנתיב):

<div dir="ltr">

```
0 15 * * 4 cd /path/to/arbox-auto-register && /usr/bin/node src/register.mjs >> logs/stdout.log 2>&1
```

</div>

---

## אזור זמן ושעון קיץ

ישראל עוברת בין שעון חורף (IST, UTC+2) לשעון קיץ (IDT, UTC+3).&rlm; cron-job.org תומך באזור הזמן `Asia/Jerusalem` באופן מובנה, כך ששעון קיץ מטופל אוטומטית — הטריגר תמיד יופעל בזמן המקומי שהגדרתם, ללא קשר לעונה.

---

## פתרון בעיות

**"inCorrectLoginDetails"**
המייל או הסיסמה שגויים. נסו להתחבר ל-[אתר Arbox](https://www.arboxapp.com/client-login) עם אותו מייל וסיסמה כדי לוודא שהם עובדים.

**"No gym (box) found on your account"**
חשבון ה-Arbox שלכם לא מקושר לחדר כושר. פנו לחדר הכושר ובקשו שיקשרו את החשבון שלכם ב-Arbox.

**"No active membership found"**
ייתכן שהמנוי שלכם פג תוקף. בדקו את סטטוס המנוי באפליקציית Arbox.

**"No class found: CrossFit on sunday at 07:00"**
שם השיעור, השעה או היום לא תואמים למה שבלוח. סיבות נפוצות:
- שם השיעור ב-Arbox שונה (למשל "WOD" במקום "CrossFit"). הריצו `npm run setup` כדי לראות שמות מדויקים.
- פורמט השעה שגוי — תמיד כתבו שתי ספרות לשעה, כמו `07:00` (לא `7:00`).
- חדר הכושר עדיין לא פרסם את לוח השיעורים לשבוע הבא.

**"registration not open yet"**
חדר הכושר פרסם את הלוח אבל עדיין לא פתח הרשמה לשיעור הזה. זה נורמלי — הסקריפט יירשם כשההרשמה תיפתח בזמן שהגדרתם.

**"class is full"**
הסקריפט מנסה להצטרף לרשימת המתנה אוטומטית. אם זה עובד, תראו `[WAITLIST]`. אם לא, תראו `[FULL]`. בדקו באפליקציית Arbox אפשרויות רשימת המתנה.

**הטריגר של cron-job.org נכשל**
בדקו את היסטוריית ההרצות בדשבורד של cron-job.org. בעיות נפוצות:
- הטוקן של GitHub פג תוקף — חדשו אותו (צעד 6) ועדכנו את ה-header&rlm; `Authorization` ב-cron-job.org.
- סטטוס התגובה הוא לא 204 — ודאו שה-URL מכיל את שם המשתמש הנכון ושלושת ה-headers הנדרשים מוגדרים (`Accept`&rlm;, `Authorization`&rlm;, `Content-Type`).

**GitHub Actions רץ אבל לא קורה כלום**
- ודאו ששני ה-secrets מוגדרים נכון: `ARBOX_EMAIL`&rlm;, `ARBOX_PASSWORD`.
- ודאו שקובץ `config.json` קיים בריפו עם שיעורים תקינים.

---

## שאלות נפוצות

**האם הסיסמה שלי מאובטחת?**
כן. ב-GitHub, הפרטים שלכם נשמרים כ-[secrets מוצפנים](https://docs.github.com/en/actions/security-guides/encrypted-secrets) — הם מוגנים ולא מוצגים בלוגים. על המחשב, הם שמורים בקובץ `.env` שלעולם לא עולה ל-GitHub.

**מה אם חדר הכושר עדיין לא פרסם את לוח השיעורים?**
הסקריפט יציג `[SKIP] registration not open yet` לאותם שיעורים. זה נורמלי — ההרשמה תקרה אוטומטית ברגע שחדר הכושר יפתח אותה.

**אפשר להירשם לאותו סוג שיעור בכמה שעות?**
כן! פשוט הוסיפו כמה רשומות עם אותו שם שיעור אבל שעות שונות. למשל, CrossFit ב-07:00 ו-CrossFit ב-18:30.

**איך משנים את לוח השיעורים שלי?**
הדרך הקלה ביותר: ערכו את `config.json` ישירות ב-GitHub (לחצו על הקובץ, ואז על אייקון העיפרון). או הריצו `npm run setup` מקומית ודחפו את ההגדרות המעודכנות.

**האם זה עובד עם כמה סניפים?**
כרגע הסקריפט משתמש בסניף הראשון בחשבון שלכם. אם צריך סניף ספציפי, פתחו issue ב-GitHub.

---

## מבנה הפרויקט

<div dir="ltr">

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
├── README.md              # English documentation
└── README.he.md           # Hebrew documentation (this file)
```

</div>

## רישיון

MIT

</div>
