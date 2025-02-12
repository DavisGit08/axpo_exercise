# AXPO_exercise by David Pérez Campos 👨
Exercise with Playwright Test.

# Project structure 📁
📦 AXPO_Exercise  
├── 📁 01_ui                            # UI layers folder
│   ├── 📁 pages                        # Pages with components folder
│   │   ├── 📄 init.page.js             # Page for initialization
│   │   └── 📄 reqApiKey.page.js        # Page for requesting an API Key  
│   └── 📁 resources                    # Resources folder
│       ├── 📄 hooks.js                 # Hooks for UI test management
│       ├── 📄 utils.js                 # Utility functions
│       └── 📁 data                     # Test data folder
│           └── 📄 data.js              # Data file
├── 📁 02_api                           # API layers folder 
│   ├── 📁 apis                         # APIs folder
│   │   ├── 📄 antartida.apis.js        # API requests related to Antartida
│   ├── 📁 resources                    # Resources folder
│   │   ├── 📄 hooks.js                 # Hooks for API test management  
│   │   ├── 📄 utils.js                 # Utility functions
│   │   ├── 📁 data                     # Test data folder
│   │   │   └── 📄 data.js              # Data file
│   │   └── 📁 responses                # Expected API responses
│   │       ├── 📄 antartida.json       # Sample response for Antarctica API
│   │       ├── 📄 datos.json           # Sample response related to datos
│   │       └── 📄 noDataAntartida.json # Response for missing data in Antarctica API  
│   ├── 📁 services                     # Service layer for API logic  
│   │   └── 📄 antartida.services.js    # Service logic for Antarctica API  
│   ├── 📁 test-results                 # Folder for storing test execution results  
│   └── 📁 tests                        # Test cases for UI and API  
│       ├── 📄 api.test.js              # API test cases  
│       └── 📄 ui.test.js               # UI test cases  
├── 📄 package-lock.json                # Lock file for installed dependencies
├── 📄 package.json                     # Project dependencies and scripts  
└── 📄 playwright.config.js             # Playwright configuration file

# Framework 🔥
This framework follows a multi-layered architecture to ensure modularity, maintainability, and scalability. It is divided into two main sections:  

- UI Testing: Implements the Page Object Model (POM) pattern.  
  - Layers:  
    - Tests layer: Contains the test cases that validate UI behavior.  
    - Pages layer: Defines reusable page objects that encapsulate UI interactions.  

- API Testing: Follows a structured three-layer architecture for better separation of concerns.  
  - Layers:  
    - Tests layer: Contains test cases that validate API responses.  
    - Services layer: Implements business logic and complex API workflows.  
    - APIs layer: Manages direct API requests and interactions.  

# How to run 🚀
Clone project: git clone https://github.com/DavisGit08/axpo_exercise.git
Command to Run both UI and API tests together: npm run test
Command to run just UI tests: npm run ui
Command to run just API tests: npm run api
Command to open the report: npm run report (anyway it's configured to be open after every execution)

UI tests are configured with headless mode. If you want to view the execution in your browser, you need to change 'headless' property as 'true' in ¡playwright.config.js' file

# Troubleshuting ⚠️
Captcha 🔧
  - **SOMETIMES IT'S NOT POSSIBLE TO SOLVE CAPTCHA, I'VE ADDED A 60 SECS TIMEOUT TO SOLVE CAPTCHA MANUALLY WHILE RUNNING, BEFORE CONTINUING THE EXECUTION.**
  - I got Captcha automation working (after many tries with mouse moves and clicks), but it sometimes fails and asks for image resolving by an human:
    - Image resolving is not possible because I need a third party service (i.e. 2Captcha or Anti Captcha). These services have not free license.
    - In tried to find a different workaround, I tried to apply dynamic IP:
      - Working with tor-request throws an error when runing: AggregateError:  - Have you enabled the ControlPort in your torrc file?
        - @derhuerst/tor is needed to be installed to control ports, but it's no longer available in npm.
      - Working with tor-proxy is not available in npm
      - Working with tor-control and tor.exe finally got it working finally!! But bad luck, captcha image is still showing up...

Emails 🔧
  - I've evaluated different options and finally decided to use MailSlurp services to send and recieve emails.
  - I tried creating a new email each iteration, so I don't need to use the same inbox, inbox id, email and email id, but I has just 50 inbox for free.
    - I finally decided to use always the same inbox and the same email (working with a free mailing service, this inbox and email could get obsolete).
  - There were issues reading new emails, so I decided to delete previous emails each time I'm going to receive a new one.
  - It sometimes takes very long to read a new email, so I needed to implement several workarounds to manage it.
    - It is supposed to not being necessary to create a loop that waits for new email each X seconds, but after many tries, I observed that it's necessary.
  - Once everything seemed to be wunning on debugging mode, it was failing when retrieving email body.
    - Email body is empty. I was uging email.body to extract it.
      - I had to insert while loop to check the email body response.

Aemet website 🔧
  - Website sometimes retrieves connection error.
    - I've implemented a loop to try to open the website again (5 times in total) if error happens.

UI tests 🔧
  - I've deciced not to develop every workflow because it requires investing too much time in this. I've just developed E2E test and written the title of the rest of the workflows.
  
# Comments ✍️
Requirements bonus:
  ✅ Implement data validation to ensure that the temperature, pressure, and speed values meet realistic thresholds.
  ✅ Evidence how you might handle the situation where the data in a public test environment is constantly changing. You do not need to evidence this in your code, some bullet points outlining your approach will suffice:
    📜 Mocking the response: Use mocking data instead of depending on live data.
    📜 Validate before test execution: Check the expected data before running the workflow.
    📜 Use dynamic data: Instead of relying on hardcoded data.
    📜 Being more flexible on assetions.

Data encryption:
  - I've added AES encryption for API KEY in api requests.
  - Email api key, Email address and inbox id are not encrypted because of running out of time, but it should be encrypted.
