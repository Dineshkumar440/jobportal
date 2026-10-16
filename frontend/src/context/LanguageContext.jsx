
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

const translations = {
  english: {
    home: "Home",
    jobs: "Jobs",
    login: "Login",
    register: "Register",
    logout: "Logout",
    settings: "Settings",
    profile: "Profile",
    dashboard: "Dashboard",
    studentDashboard: "Student Dashboard",
    companyDashboard: "Company Dashboard",
    adminDashboard: "Admin Dashboard",
    createAccount: "Create Account",
    findJobs: "Find Jobs",
    postJob: "Post a Job",
    searchJobs: "Search jobs...",
    search: "Search",
    about: "About",
    whyJobPortal: "Why JobPortal",

    appearance: "Appearance",
    language: "Language",
    notifications: "Notifications",
    account: "Account",
    security: "Security",
    preferences: "PREFERENCES",
    managePreferences:
      "Manage your JobPortal preferences, appearance and account settings.",
    customizeAppearance:
      "Customize how JobPortal looks on your device.",

    theme: "Theme",
    chooseTheme: "Choose your preferred appearance.",
    light: "Light",
    dark: "Dark",
    system: "System",
    lightDescription: "Always use light mode",
    darkDescription: "Always use dark mode",
    systemDescription: "Follow your device theme",
    platform: "Platform",
    forUsers: "For Users",
    student: "Student",
    aboutJobPortal: "About JobPortal",
    footerDescription:
    "Connecting talent with better opportunities. Build your profile, discover jobs, and take the next step in your career.",
    fontSize: "Font Size",
    changeFontSize:
      "Change the overall size of text across JobPortal.",
    small: "Small",
    medium: "Medium",
    large: "Large",
    defaultSize: "Default size",

    languagePreference: "Language Preference",
    chooseLanguage: "Choose your preferred application language.",
    english: "English",
    tamil: "Tamil",
    languageSaved: "Your language preference is saved automatically.",

    notificationDescription:
      "Control how JobPortal communicates with you.",
    applicationNotifications: "Application Notifications",
    applicationNotificationsDescription:
      "Receive notifications about your job applications and application status.",

    guest: "You are browsing as a guest",
    guestDescription:
      "Login or create an account to access your personalized JobPortal features.",

    studentAccount: "STUDENT ACCOUNT",
    studentProfile: "Student Profile",
    studentProfileDescription:
      "Manage your education, skills, resume and profile.",
    viewProfile: "View Profile",

    company: "Company",
    companies: "Companies",
    companyAccount: "COMPANY ACCOUNT",
    companyDescription:
      "Manage company details, jobs and applications.",

    adminAccount: "ADMIN ACCOUNT",
    adminDescription:
      "Manage and monitor the JobPortal platform.",

    openDashboard: "Open Dashboard",
    manageAccount: "Manage your JobPortal account.",

    securityDescription:
      "Manage your account session and security.",
    logoutDescription: "Sign out from your JobPortal account.",

    dangerZone: "DANGER ZONE",
    deleteAccount: "Delete Account",
    deleteAccountDescription:
      "Permanently delete your JobPortal account and associated data.",
    deleteAccountWarning:
      "This action cannot be undone. Enter your password to permanently delete your account.",

    enterPassword: "Please enter your password",
    confirmDelete:
      "Are you sure you want to permanently delete your account?",
    accountDeleted: "Your account has been deleted successfully.",
    deleteFailed: "Unable to delete account",
    deleting: "Deleting...",
    confirmDeleteButton: "Yes, Delete Account",

    find: "Find.",
    apply: "Apply.",
    grow: "Grow.",
    backToTop: "Back to top",
    allRightsReserved: "All rights reserved.",
    resetDefaults: "Reset to Default",
    cancel: "Cancel",
    save: "Save",

    
heroBadge: "Your next career move starts here",
heroTitleFirst: "Find the right job.",
heroTitleSecond: "Build your future.",
heroDescription: "Discover job opportunities, showcase your skills, and connect with companies looking for the right talent.",
jobSearchPlaceholder: "Job title, skill or location...",
searchJobsButton: "Search Jobs",
exploreAvailableJobs: "Explore available jobs",
buildYourProfile: "Build your profile",
trackApplications: "Track applications",
jobPreview: "Job preview",
nextOpportunity: "YOUR NEXT OPPORTUNITY",
softwareDevelopment: "Software Development",
findYourFit: "Find your fit",
listedJobs: "Listed Jobs",
onePlatform: "One platform",
jobsAndApplications: "Jobs and applications",
platformOverview: "Platform overview",
matchingJobs: "Matching Jobs",
userRoles: "User Roles",
one: "One",
careerPlatform: "Career Platform",
exploreOpportunities: "EXPLORE OPPORTUNITIES",
latestJobOpenings: "Latest Job Openings",
latestJobsDescription: "Discover opportunities that match your skills and career goals.",
exploreAllJobs: "Explore All Jobs",
filterJobListings: "Filter job listings",
filterOpportunities: "Filter opportunities...",
loadingJobOpportunities: "Loading job opportunities...",
jobFound: "job found",
jobsFound: "jobs found",
findingOpportunities: "Finding opportunities",
pleaseWaitJobs: "Please wait while we load the latest jobs.",
couldNotLoadJobs: "Couldn't load jobs",
jobsLoadError: "Unable to load jobs right now. Please try again.",
tryAgain: "Try Again",
noMatchingJobs: "No matching jobs",
noJobsAvailable: "No jobs available yet",
tryAnotherSearch: "Try another job title, skill or location.",
newJobsWillAppear: "New opportunities will appear here when they are published.",
clearSearch: "Clear Search",
jobOpening: "Job opening",
untitledPosition: "Untitled Position",
locationNotSpecified: "Location not specified",
salary: "Salary",
notSpecified: "Not specified",
jobDescriptionFallback: "Explore this opportunity and take the next step in your career.",
viewJobDetails: "View Job Details",
showing: "Showing",
of: "of",
availableJobs: "available jobs",
simplerCareerTitle: "A simpler way to move your career forward",
simplerCareerDescription: "The essential tools to explore jobs, present your skills, and manage your applications in one place.",
discoverOpportunities: "Discover Opportunities",
discoverDescription: "Search available positions and explore roles that align with your skills and career interests.",
profileDescription: "Present your education, technical skills, and resume through your student profile.",
manageApplications: "Manage Applications",
applicationsDescription: "Apply for suitable positions and follow the progress of your job applications.",
bringingJobSeekers: "Bringing job seekers and companies",
closerTogether: "closer together.",
aboutDescriptionFirst: "JobPortal is a web-based recruitment platform designed to bring students, job seekers, and companies together. It provides a central place to explore job openings and manage recruitment activities.",
aboutDescriptionSecond: "Students can create profiles and apply for positions. Companies can publish vacancies and review applications. Administrators can monitor the platform.",
studentProfiles: "Student profiles",
companyJobPosting: "Company job posting",
applicationManagement: "Application management",
getStarted: "Get Started",
careerWorkspace: "YOUR CAREER WORKSPACE",
moveForward: "Move forward, one step at a time.",
exploreJobs: "Explore jobs",
discover: "Discover",
yourProfile: "Your profile",
showcase: "Showcase",
yourNextStep: "Your next step",
searchSuitableRole: "Search for a suitable role",
nextStepStartsHere: "YOUR NEXT STEP STARTS HERE",
readyToExplore: "Ready to explore your next opportunity?",
createAccountDescription: "Create your account, build your profile, and start exploring available jobs on JobPortal.",
one: "One",
platform: "Platform",
forUsers: "For Users",
student: "Student",
aboutJobPortal: "About JobPortal",

careerStartsHere: "YOUR CAREER STARTS HERE",
loginWelcomeTitle: "Welcome to your",
loginWelcomeHighlight: "next opportunity.",
loginWelcomeDescription:
  "Take the next step in your career. Discover opportunities, connect with companies, and move towards your goals.",
loginBenefitOneTitle: "Discover opportunities",
loginBenefitOneDescription:
  "Explore job openings that match your skills.",
loginBenefitTwoTitle: "Showcase your profile",
loginBenefitTwoDescription:
  "Help companies understand your skills and experience.",
loginBenefitThreeTitle: "Manage your journey",
loginBenefitThreeDescription:
  "Keep track of your job applications in one place.",
loginWelcomeFooter: "Your next chapter starts with one step.",
loginFormEyebrow: "YOUR ACCOUNT",
welcomeBack: "Welcome back!",
loginSubtitle: "Enter your credentials to access your account.",
username: "Username",
enterUsername: "Enter your username",
password: "Password",
enterPassword: "Enter your password",
loggingIn: "Logging in...",
login: "Login",
or: "OR",
dontHaveAccount: "Don't have an account?",
createAccount: "Create Account",
loginSecurityNote: "Your account access is protected.",
enterLoginCredentials: "Please enter username and password.",
loginSuccessful: "Login successful!",
invalidCredentials: "Invalid username or password.",


    // Register page - English
    registerEyebrow: "YOUR CAREER STARTS HERE",
    registerWelcomeTitle: "Build your future.",
    registerWelcomeHighlight: "Find your opportunity.",
    registerWelcomeDescription:
      "Create your account to explore career opportunities, connect with companies, and take the next step in your professional journey.",

    registerBenefitOneTitle: "Discover opportunities",
    registerBenefitOneDescription:
      "Explore jobs that match your career goals.",
    registerBenefitTwoTitle: "Manage your applications",
    registerBenefitTwoDescription:
      "Track your applications in one place.",
    registerBenefitThreeTitle: "Connect with employers",
    registerBenefitThreeDescription:
      "Turn your skills into career opportunities.",

    registerFormEyebrow: "GET STARTED",
    registerTitle: "Create your account",
    registerSubtitle:
      "Join JobPortal and take the next step in your career.",

    emailAddress: "Email address",
    enterEmail: "you@example.com",
    chooseUsername: "Choose a username",
    createStrongPassword: "Create a strong password",
    passwordHint:
      "Use a strong password that you haven't used elsewhere.",

    accountType: "Account type",
    studentJobSeeker: "Student / Job Seeker",
    companyEmployer: "Company / Employer",

    creatingAccount: "Creating account...",
    createAccount: "Create Account",
    registerSuccess:
      "Registration successful! Redirecting to login...",
    registerRequiredFields: "Please fill in all fields.",
    registerFailed:
      "Registration failed. Please check your details.",
    registerConnectionError:
      "Unable to connect to the server. Please try again.",

    alreadyMember: "ALREADY A MEMBER?",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign in",
    registerSecurityNote:
      "Your information is handled securely.",
    registerFooter:
      "All rights reserved.",

    // About page - English
aboutBadge: "ABOUT JOBPORTAL",
heroTitle: "Connecting Talent With",
heroTitleHighlight: " Better Opportunities.",
heroDescription:
  "Your next career opportunity starts here. JobPortal brings students, job seekers, and companies together through one convenient platform.",
exploreJobs: "Explore Jobs",
discoverJobPortal: "Discover JobPortal",
platformNote: "One platform for students, companies, and administrators",

yourNextChapter: "YOUR NEXT CHAPTER",
visualTitle: "Turn your skills into opportunities.",
visualDescription:
  "Discover possibilities. Build connections. Move forward.",
createYourProfile: "Create your profile",
showcaseYourStrengths: "Showcase your strengths",
exploreOpportunities: "Explore opportunities",
findYourNextRole: "Find your next role",
takeNextStep: "Take the next step",
moveTowardsGoals: "Move towards your goals",
findYourDirection: "Find your direction",
yourCareerJourney: "Your career, your journey",
buildConnections: "Build connections",
talentMeetsOpportunity: "Talent meets opportunity",

whoWeAre: "WHO WE ARE",
aboutHeading: "A smarter way to connect",
aboutHeadingHighlight: " talent and opportunity.",
aboutDescription1:
  "JobPortal is a web-based job platform designed to simplify the connection between job seekers and companies. It brings essential recruitment activities together in one place.",
aboutDescription2:
  "Students can build their profiles, explore available jobs, and apply for suitable positions. Companies can showcase their organizations, publish job openings, and manage applications.",
aboutDescription3:
  "An administration dashboard supports platform management by bringing key information about students, companies, jobs, and applications together.",
ourGoal: "Our goal",
goalDescription:
  "Make the job discovery and application journey simpler, clearer, and more accessible.",

whatYouCanDo: "WHAT YOU CAN DO",
featuresHeading: "Everything you need,",
featuresHeadingHighlight: " in one place.",
featuresDescription:
  "Explore the features designed to support students, companies, and platform administrators.",

studentProfiles: "Student Profiles",
studentProfilesDescription:
  "Build your professional profile and showcase your education, skills, and career interests.",
jobOpportunities: "Job Opportunities",
jobOpportunitiesDescription:
  "Discover job opportunities and explore positions that match your skills and career goals.",
companyProfiles: "Company Profiles",
companyProfilesDescription:
  "Create a company profile and share your organization's information with potential candidates.",
jobApplications: "Job Applications",
jobApplicationsDescription:
  "Apply for suitable positions and keep track of your application progress.",
applicationManagement: "Application Management",
applicationManagementDescription:
  "Help companies review applications and manage candidates for their job openings.",
adminManagement: "Admin Management",
adminManagementDescription:
  "Provide administrators with tools to monitor students, companies, jobs, and applications.",

ourTechStack: "OUR TECH STACK",
technologyHeading: "Built with modern",
technologyHeadingHighlight: " web technologies.",
technologyDescription:
  "A full-stack project combining a responsive frontend, backend APIs, and a relational database.",
frontendDevelopment: "Frontend development",
backendApi: "Backend API",
programmingLanguage: "Programming language",
database: "Database",

projectDeveloper: "PROJECT DEVELOPER",
developerEyebrow: "THE PERSON BEHIND THE PROJECT",
developerRole: "MCA Student & Aspiring Python Backend Developer",
developerDescription:
  "This project was developed as a practical full-stack web application using React.js, Django REST Framework, Python, and PostgreSQL, bringing together frontend development, backend APIs, and database management.",

ctaLabel: "YOUR NEXT STEP STARTS HERE",
ctaHeading: "Ready to explore new opportunities?",
ctaDescription:
  "Discover available jobs and take the next step towards your career goals.",
exploreOpportunitiesButton: "Explore Opportunities",


adminLoading: "Loading dashboard",
adminLoadingDescription: "Please wait while we prepare your overview.",
adminLoadError: "Unable to load dashboard",
adminLoadErrorDescription: "Please log in as an administrator and try again.",
adminTryAgain: "Try Again",

adminTotalStudents: "Total Students",
adminTotalCompanies: "Total Companies",
adminTotalJobs: "Total Jobs",
adminTotalApplications: "Total Applications",

adminStudentsDescription: "Registered job seekers",
adminCompaniesDescription: "Registered employers",
adminJobsDescription: "Published opportunities",
adminApplicationsDescription: "Applications submitted",

adminBrandLabel: "JOBPORTAL MANAGEMENT",
adminDashboardTitle: "Admin Dashboard",
adminDashboardDescription:
  "Monitor platform activity and get an overview of your recruitment community.",
adminAdministrator: "Administrator",

adminPlatformOverview: "PLATFORM OVERVIEW",
adminWelcomeTitle: "Everything at a glance.",
adminWelcomeDescription:
  "Track students, companies, job opportunities, and applications from one place.",
adminPlatformStatistics: "Platform statistics",
adminOverviewLabel: "Overview",

adminSummaryLabel: "PLATFORM SUMMARY",
adminOverviewTitle: "Platform Overview",
adminOverviewDescription:
  "A quick summary of the current platform totals.",


applicantsLoading: "Loading applicants",
applicantsLoadingDescription: "Please wait while we load the applications.",
applicantsLoadError: "Unable to load applicants. Please try again.",
applicationAccepted: "Application accepted successfully!",
applicationRejected: "Application rejected successfully!",
applicationUpdateError: "Unable to update the application. Please try again.",
applicantsTryAgain: "Try Again",
applicantsManagement: "APPLICATION MANAGEMENT",
applicantsTitle: "Applicants",
applicantsDescription: "Review candidates and manage applications for this job.",
applicantsTotal: "Total Applicants",
noApplicantsTitle: "No Applicants Yet",
noApplicantsDescription: "No one has applied for this job yet. New applications will appear here.",
applicantUnknown: "Unknown Applicant",
applicantNotProvided: "Not provided",
applicantSkills: "Skills",
applicantAppliedAt: "Applied At",
applicantViewResume: "View Resume",
applicantProcessing: "Processing...",
applicantAccept: "Accept",
applicantReject: "Reject",
applicationStatusAccepted: "Accepted",
applicationStatusRejected: "Rejected",
applicationStatusPending: "Pending",


companyLoadingTitle: "Loading company dashboard",
companyLoadingDescription: "Please wait while we load your company details.",
companyDashboardLoadError: "Unable to load the company dashboard. Please try again.",
companyDashboardErrorTitle: "Something went wrong",
companyTryAgain: "Try Again",
companyConfirmDelete: "Are you sure you want to delete this job?",
companyJobDeleted: "Job deleted successfully!",
companyDeleteError: "Failed to delete the job. Please try again.",
companyDashboardLabel: "COMPANY WORKSPACE",
companyDefaultName: "Your Company",
companyDashboardDescription: "Manage your job postings and connect with potential candidates.",
companyPostNewJob: "Post New Job",
companySummaryLabel: "Company statistics",
companyTotalJobs: "Total Jobs",
companyTotalApplicants: "Total Applicants",
companyJobsSummary: "Job postings on your dashboard",
companyApplicantsSummary: "Candidates who applied to your jobs",
companyYourListings: "YOUR RECRUITMENT",
companyYourJobs: "Your Jobs",
companyJobsDescription: "Manage your job listings and review applicants.",
companyJobsCountLabel: "jobs",
companyNoJobsTitle: "No Jobs Posted Yet",
companyNoJobsDescription: "You haven't posted any jobs yet. Create your first listing to start finding candidates.",
companyPostFirstJob: "Post Your First Job",
companyJobListing: "JOB LISTING",
companyApplicantsLabel: "applicants",
companyLocationNotProvided: "Location not specified",
companySalaryNotProvided: "Salary not specified",
companyEdit: "Edit",
companyDelete: "Delete",
companyDeleting: "Deleting...",
companyViewApplicants: "View Applicants",


createJobEyebrow: "RECRUITMENT",
createJobTitle: "Create a Job",
createJobDescription: "Share a new opportunity and find the right candidates for your team.",
createJobTitleLabel: "Job Title",
createJobTitlePlaceholder: "e.g. Python Developer",
createJobDescriptionLabel: "Job Description",
createJobDescriptionPlaceholder: "Describe the role, responsibilities, and requirements...",
createJobDescriptionHint: "Include responsibilities, required skills, and qualifications.",
createJobLocationLabel: "Location",
createJobLocationPlaceholder: "e.g. Chennai",
createJobSalaryLabel: "Salary (INR)",
createJobSalaryPlaceholder: "e.g. 25000",
createJobSalaryHint: "Enter the salary amount in Indian Rupees.",
createJobCancel: "Cancel",
createJobCreating: "Creating...",
createJobSubmit: "Create Job",
createJobRequiredError: "Please fill in all required fields.",
createJobSalaryError: "Please enter a valid, non-negative salary.",
createJobSuccess: "Job created successfully!",
createJobFailure: "Failed to create the job. Please try again.",

editJobEyebrow: "JOB MANAGEMENT",
editJobTitle: "Edit Job",
editJobDescription: "Update the details of your job posting and keep your listing up to date.",
editJobTitleLabel: "Job Title",
editJobTitlePlaceholder: "e.g. Python Developer",
editJobDescriptionLabel: "Job Description",
editJobDescriptionPlaceholder: "Describe the role, responsibilities, and requirements...",
editJobLocationLabel: "Location",
editJobLocationPlaceholder: "e.g. Chennai",
editJobSalaryLabel: "Salary (INR)",
editJobSalaryPlaceholder: "Enter salary amount",
editJobSalaryHint: "Enter the salary amount in Indian Rupees.",
editJobCancel: "Cancel",
editJobUpdating: "Updating...",
editJobSubmit: "Update Job",
editJobLoading: "Loading job details...",
editJobLoadError: "Unable to load job details. Please try again.",
editJobTryAgain: "Try Again",
editJobValidationError: "Please fill in all fields with valid values.",
editJobSuccess: "Job updated successfully!",
editJobUpdateError: "Failed to update the job. Please try again.",

forgotPasswordTitle: "Forgot Password?",
forgotPasswordDescription:
  "Enter your registered email address. If an account exists, we will send you a password reset link.",
forgotPasswordEmailLabel: "Email address",
forgotPasswordEmailPlaceholder: "Enter your registered email",
forgotPasswordSending: "Sending...",
forgotPasswordSubmit: "Send Reset Link",
forgotPasswordSuccess:
  "If an account exists for this email, password reset instructions will be sent.",
forgotPasswordError:
  "Unable to process your request. Please try again.",
forgotPasswordBackToLogin: "← Back to Login",

jobDetailsEyebrow: "JOB DETAILS",
jobDetailsLoading: "Loading job details...",
jobDetailsLoadError: "Unable to load job details. Please try again.",
jobDetailsNotFound: "Job Not Found",
jobDetailsTryAgain: "Try Again",
jobDetailsBack: "← Back to Jobs",
jobDetailsLocationMissing: "Location not specified",
jobDetailsSalaryLabel: "Salary",
jobDetailsSalaryMissing: "Not specified",
jobDetailsDescriptionTitle: "Job Description",
jobDetailsDescriptionMissing: "No description provided.",
jobDetailsApply: "Apply Now",
jobDetailsApplying: "Applying...",
jobDetailsApplied: "Application Submitted",
jobDetailsApplySuccess: "Your application was submitted successfully!",
jobDetailsApplyError: "Application failed. Please try again.",

resetPasswordTitle: "Set a New Password",
resetPasswordDescription: "Choose a strong password for your account.",
resetPasswordNewLabel: "New password",
resetPasswordNewPlaceholder: "Enter your new password",
resetPasswordConfirmLabel: "Confirm new password",
resetPasswordConfirmPlaceholder: "Re-enter your new password",
resetPasswordUpdating: "Updating...",
resetPasswordSubmit: "Reset Password",
resetPasswordMismatch: "Passwords do not match.",
resetPasswordRequired: "Please enter a valid password.",
resetPasswordSuccess: "Your password has been reset successfully.",
resetPasswordError: "Unable to reset password. The link may be invalid or expired.",
resetPasswordBackToLogin: "← Back to Login",

studentDashboardEyebrow: "STUDENT WORKSPACE",
studentDashboardTitle: "My Applications",
studentDashboardDescription: "Track your job applications and their current status.",
studentDashboardLoading: "Loading your applications...",
studentDashboardLoadError: "Unable to load applications. Please try again.",
studentDashboardErrorTitle: "Something went wrong",
studentDashboardTryAgain: "Try Again",
studentDashboardSummary: "Application summary",
studentTotalApplications: "Total Applications",
studentAccepted: "Accepted",
studentPending: "Pending",
studentRejected: "Rejected",
studentNoApplicationsTitle: "No Applications Found",
studentNoApplicationsDescription: "You haven't applied for any jobs yet. Explore available jobs and submit your first application.",
studentBrowseJobs: "Browse Jobs",
studentRecentApplications: "Recent Applications",
studentApplicationsSubtitle: "Keep track of your submitted applications.",
studentApplicationsLabel: "applications",
studentUnknownJob: "Job Title Not Available",
studentLocationMissing: "Location not specified",
studentAppliedDate: "Applied",
studentDateMissing: "Date unavailable",
studentStatusAccepted: "Accepted",
studentStatusRejected: "Rejected",
studentStatusPending: "Pending",

profileEyebrow: "ACCOUNT",
profileTitle: "Your Profile",
profileDescription: "Manage your professional information and keep your profile up to date.",
profileDashboard: "Dashboard",
profilePersonalInfo: "Personal Information",
profilePersonalInfoDescription: "Update the information companies can use to understand your profile.",
profilePhone: "Phone Number",
profilePhonePlaceholder: "Enter your phone number",
profileEducation: "Education",
profileEducationPlaceholder: "e.g. MCA",
profileSkills: "Skills",
profileSkillsPlaceholder: "e.g. Python, Django, PostgreSQL, React JS",
profileSkillsHint: "Add the technical skills that best represent your experience.",
profileReset: "Reset",
profileSaving: "Saving...",
profileSaveChanges: "Save Changes",
profileLoading: "Loading your profile...",
profileLoadError: "Unable to load your profile. Please try again.",
profileUpdateSuccess: "Profile updated successfully!",
profileUpdateError: "Unable to update your profile. Please try again.",
profileTipsTitle: "Build a stronger profile",
profileTipsDescription: "A complete profile helps companies understand your background and skills when reviewing applications.",
profileTipEducation: "Keep your education updated",
profileTipSkills: "Add relevant technical skills",
profileTipAccuracy: "Keep your information accurate",

  },

  tamil: {
    home: "முகப்பு",
    jobs: "வேலைவாய்ப்புகள்",
    login: "உள்நுழை",
    register: "பதிவு செய்",
    logout: "வெளியேறு",
    settings: "அமைப்புகள்",
    profile: "சுயவிவரம்",
    dashboard: "டாஷ்போர்டு",
    studentDashboard: "மாணவர் டாஷ்போர்டு",
    companyDashboard: "நிறுவன டாஷ்போர்டு",
    adminDashboard: "நிர்வாக டாஷ்போர்டு",
    createAccount: "கணக்கை உருவாக்கு",
    findJobs: "வேலை தேடு",
    postJob: "வேலையைப் பதிவிடு",
    searchJobs: "வேலைகளைத் தேடுங்கள்...",
    search: "தேடு",
    about: "எங்களைப் பற்றி",
    whyJobPortal: "ஏன் JobPortal?",

    appearance: "தோற்றம்",
    language: "மொழி",
    notifications: "அறிவிப்புகள்",
    account: "கணக்கு",
    security: "பாதுகாப்பு",
    preferences: "விருப்ப அமைப்புகள்",
    managePreferences:
      "உங்கள் JobPortal விருப்பங்கள், தோற்றம் மற்றும் கணக்கு அமைப்புகளை நிர்வகிக்கவும்.",
    customizeAppearance:
      "உங்கள் சாதனத்தில் JobPortal தோற்றத்தை மாற்றவும்.",

    theme: "தீம்",
    chooseTheme: "உங்களுக்கு விருப்பமான தோற்றத்தைத் தேர்ந்தெடுக்கவும்.",
    light: "ஒளி பயன்முறை",
    dark: "இருள் பயன்முறை",
    system: "சாதன அமைப்பு",
    lightDescription: "எப்போதும் ஒளி பயன்முறையைப் பயன்படுத்து",
    darkDescription: "எப்போதும் இருள் பயன்முறையைப் பயன்படுத்து",
    systemDescription: "உங்கள் சாதனத்தின் தீமைப் பின்பற்று",
    platform: "தளம்",
    forUsers: "பயனர்களுக்கு",
    student: "மாணவர்",
    aboutJobPortal: "JobPortal பற்றி",
    footerDescription:
  "திறமைகளைச் சிறந்த வேலைவாய்ப்புகளுடன் இணைக்கிறோம். உங்கள் சுயவிவரத்தை உருவாக்கி, வேலைகளைத் தேடி, உங்கள் தொழில் வாழ்க்கையில் அடுத்த படியை எடுங்கள்.",
    fontSize: "எழுத்து அளவு",
    changeFontSize: "JobPortal முழுவதும் எழுத்துகளின் அளவை மாற்றவும்.",
    small: "சிறியது",
    medium: "நடுத்தரம்",
    large: "பெரியது",
    defaultSize: "இயல்புநிலை அளவு",

    languagePreference: "மொழி விருப்பம்",
    chooseLanguage: "உங்களுக்கு விருப்பமான பயன்பாட்டு மொழியைத் தேர்ந்தெடுக்கவும்.",
    english: "ஆங்கிலம்",
    tamil: "தமிழ்",
    languageSaved: "உங்கள் மொழி விருப்பம் தானாகச் சேமிக்கப்படும்.",

    notificationDescription:
      "JobPortal உங்களுக்கு எவ்வாறு அறிவிப்புகளை வழங்க வேண்டும் என்பதைத் தேர்ந்தெடுக்கவும்.",
    applicationNotifications: "விண்ணப்ப அறிவிப்புகள்",
    applicationNotificationsDescription:
      "உங்கள் வேலை விண்ணப்பங்கள் மற்றும் அவற்றின் நிலை குறித்த அறிவிப்புகளைப் பெறுங்கள்.",

    guest: "நீங்கள் விருந்தினராகப் பயன்படுத்துகிறீர்கள்",
    guestDescription:
      "உங்கள் தனிப்பயன் JobPortal அம்சங்களைப் பயன்படுத்த உள்நுழையவும் அல்லது கணக்கை உருவாக்கவும்.",

    studentAccount: "மாணவர் கணக்கு",
    studentProfile: "மாணவர் சுயவிவரம்",
    studentProfileDescription:
      "உங்கள் கல்வி, திறன்கள், ரெஸ்யூம் மற்றும் சுயவிவரத்தை நிர்வகிக்கவும்.",
    viewProfile: "சுயவிவரத்தைப் பார்",

    company: "நிறுவனம்",
    companies: "நிறுவனங்கள்",
    companyAccount: "நிறுவனக் கணக்கு",
    companyDescription:
      "நிறுவன விவரங்கள், வேலைகள் மற்றும் விண்ணப்பங்களை நிர்வகிக்கவும்.",

    adminAccount: "நிர்வாகக் கணக்கு",
    adminDescription:
      "JobPortal தளத்தை நிர்வகித்து கண்காணிக்கவும்.",

    openDashboard: "டாஷ்போர்டைத் திற",
    manageAccount: "உங்கள் JobPortal கணக்கை நிர்வகிக்கவும்.",

    securityDescription:
      "உங்கள் கணக்கு அமர்வு மற்றும் பாதுகாப்பை நிர்வகிக்கவும்.",
    logoutDescription: "உங்கள் JobPortal கணக்கிலிருந்து வெளியேறவும்.",

    dangerZone: "ஆபத்தான பகுதி",
    deleteAccount: "கணக்கை நீக்கு",
    deleteAccountDescription:
      "உங்கள் JobPortal கணக்கையும் தொடர்புடைய தரவுகளையும் நிரந்தரமாக நீக்கவும்.",
    deleteAccountWarning:
      "இந்தச் செயலை மீண்டும் மாற்ற முடியாது. உங்கள் கணக்கை நிரந்தரமாக நீக்க கடவுச்சொல்லை உள்ளிடவும்.",

    enterPassword: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    confirmDelete:
      "உங்கள் கணக்கை நிரந்தரமாக நீக்க விரும்புகிறீர்களா?",
    accountDeleted: "உங்கள் கணக்கு வெற்றிகரமாக நீக்கப்பட்டது.",
    deleteFailed: "கணக்கை நீக்க முடியவில்லை",
    deleting: "நீக்கப்படுகிறது...",
    confirmDeleteButton: "ஆம், கணக்கை நீக்கு",

    find: "தேடு.",
    apply: "விண்ணப்பி.",
    grow: "முன்னேறு.",
    backToTop: "மேலே செல்",
    allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    resetDefaults: "இயல்புநிலைக்கு மீட்டமை",
    cancel: "ரத்து செய்",
    save: "சேமி",

    
heroBadge: "உங்கள் அடுத்த தொழில் வாய்ப்பு இங்கே தொடங்குகிறது",
heroTitleFirst: "சரியான வேலையைத் தேடுங்கள்.",
heroTitleSecond: "உங்கள் எதிர்காலத்தை உருவாக்குங்கள்.",
heroDescription: "வேலைவாய்ப்புகளைக் கண்டறியுங்கள், உங்கள் திறன்களை வெளிப்படுத்துங்கள், சரியான திறமையாளர்களைத் தேடும் நிறுவனங்களுடன் இணையுங்கள்.",
jobSearchPlaceholder: "வேலைப் பெயர், திறன் அல்லது இடம்...",
searchJobsButton: "வேலைகளைத் தேடு",
exploreAvailableJobs: "கிடைக்கும் வேலைகளைப் பாருங்கள்",
buildYourProfile: "உங்கள் சுயவிவரத்தை உருவாக்குங்கள்",
trackApplications: "விண்ணப்பங்களைக் கண்காணியுங்கள்",
jobPreview: "வேலை முன்னோட்டம்",
nextOpportunity: "உங்கள் அடுத்த வாய்ப்பு",
softwareDevelopment: "மென்பொருள் மேம்பாடு",
findYourFit: "உங்களுக்கான வேலையைக் கண்டறியுங்கள்",
listedJobs: "பதிவிடப்பட்ட வேலைகள்",
onePlatform: "ஒரே தளம்",
jobsAndApplications: "வேலைகளும் விண்ணப்பங்களும்",
platformOverview: "தளத்தின் மேலோட்டம்",
matchingJobs: "பொருந்தும் வேலைகள்",
userRoles: "பயனர் வகைகள்",
one: "ஒன்று",
careerPlatform: "தொழில் தளம்",
exploreOpportunities: "வாய்ப்புகளை ஆராயுங்கள்",
latestJobOpenings: "சமீபத்திய வேலைவாய்ப்புகள்",
latestJobsDescription: "உங்கள் திறன்களுக்கும் தொழில் இலக்குகளுக்கும் பொருந்தும் வாய்ப்புகளைக் கண்டறியுங்கள்.",
exploreAllJobs: "அனைத்து வேலைகளையும் பாருங்கள்",
filterJobListings: "வேலைப் பட்டியலை வடிகட்டவும்",
filterOpportunities: "வாய்ப்புகளை வடிகட்டுங்கள்...",
loadingJobOpportunities: "வேலைவாய்ப்புகள் ஏற்றப்படுகின்றன...",
jobFound: "வேலை கிடைத்தது",
jobsFound: "வேலைகள் கிடைத்தன",
findingOpportunities: "வாய்ப்புகளைத் தேடுகிறோம்",
pleaseWaitJobs: "சமீபத்திய வேலைகளை ஏற்றும் வரை காத்திருக்கவும்.",
couldNotLoadJobs: "வேலைகளை ஏற்ற முடியவில்லை",
jobsLoadError: "தற்போது வேலைகளை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
tryAgain: "மீண்டும் முயற்சிக்கவும்",
noMatchingJobs: "பொருந்தும் வேலைகள் இல்லை",
noJobsAvailable: "இன்னும் வேலைகள் இல்லை",
tryAnotherSearch: "வேறு வேலைப் பெயர், திறன் அல்லது இடத்தை முயற்சிக்கவும்.",
newJobsWillAppear: "புதிய வேலைவாய்ப்புகள் வெளியிடப்படும்போது இங்கே தோன்றும்.",
clearSearch: "தேடலை நீக்கு",
jobOpening: "வேலைவாய்ப்பு",
untitledPosition: "பெயரிடப்படாத பதவி",
locationNotSpecified: "இடம் குறிப்பிடப்படவில்லை",
salary: "சம்பளம்",
notSpecified: "குறிப்பிடப்படவில்லை",
jobDescriptionFallback: "இந்த வாய்ப்பை ஆராய்ந்து உங்கள் தொழில் வாழ்க்கையின் அடுத்த படியை எடுங்கள்.",
viewJobDetails: "வேலை விவரங்களைப் பார்க்கவும்",
showing: "காட்டப்படுவது",
of: "மொத்தம்",
availableJobs: "கிடைக்கும் வேலைகள்",
simplerCareerTitle: "உங்கள் தொழில் வளர்ச்சிக்கான எளிய வழி",
simplerCareerDescription: "வேலைகளைத் தேடவும், திறன்களை வெளிப்படுத்தவும், விண்ணப்பங்களை நிர்வகிக்கவும் தேவையான கருவிகள் ஒரே இடத்தில்.",
discoverOpportunities: "வாய்ப்புகளைக் கண்டறியுங்கள்",
discoverDescription: "உங்கள் திறன்களுக்கும் தொழில் ஆர்வங்களுக்கும் பொருந்தும் வேலைகளைத் தேடுங்கள்.",
profileDescription: "உங்கள் கல்வி, தொழில்நுட்பத் திறன்கள் மற்றும் ரெஸ்யூமேவை மாணவர் சுயவிவரத்தில் வழங்குங்கள்.",
manageApplications: "விண்ணப்பங்களை நிர்வகியுங்கள்",
applicationsDescription: "பொருத்தமான வேலைகளுக்கு விண்ணப்பித்து அவற்றின் முன்னேற்றத்தைக் கண்காணியுங்கள்.",
bringingJobSeekers: "வேலை தேடுபவர்களையும் நிறுவனங்களையும்",
closerTogether: "ஒன்றிணைக்கிறது.",
aboutDescriptionFirst: "JobPortal என்பது மாணவர்கள், வேலை தேடுபவர்கள் மற்றும் நிறுவனங்களை இணைக்கும் இணையவழி ஆட்சேர்ப்பு தளமாகும். வேலைவாய்ப்புகளைத் தேடவும் ஆட்சேர்ப்பு நடவடிக்கைகளை நிர்வகிக்கவும் இது உதவுகிறது.",
aboutDescriptionSecond: "மாணவர்கள் சுயவிவரங்களை உருவாக்கி வேலைகளுக்கு விண்ணப்பிக்கலாம். நிறுவனங்கள் வேலைவாய்ப்புகளைப் பதிவிட்டு விண்ணப்பங்களைப் பரிசீலிக்கலாம். நிர்வாகிகள் தளத்தைக் கண்காணிக்கலாம்.",
studentProfiles: "மாணவர் சுயவிவரங்கள்",
companyJobPosting: "நிறுவன வேலைப் பதிவுகள்",
applicationManagement: "விண்ணப்ப நிர்வாகம்",
getStarted: "தொடங்குங்கள்",
careerWorkspace: "உங்கள் தொழில் பணித்தளம்",
moveForward: "ஒவ்வொரு படியாக முன்னேறுங்கள்.",
exploreJobs: "வேலைகளை ஆராயுங்கள்",
discover: "கண்டறியுங்கள்",
yourProfile: "உங்கள் சுயவிவரம்",
showcase: "வெளிப்படுத்துங்கள்",
yourNextStep: "உங்கள் அடுத்த படி",
searchSuitableRole: "பொருத்தமான வேலையைத் தேடுங்கள்",
nextStepStartsHere: "உங்கள் அடுத்த படி இங்கே தொடங்குகிறது",
readyToExplore: "உங்கள் அடுத்த வாய்ப்பை ஆராயத் தயாரா?",
createAccountDescription: "கணக்கை உருவாக்கி, சுயவிவரத்தை அமைத்து, JobPortal-ல் கிடைக்கும் வேலைகளைத் தேடத் தொடங்குங்கள்.",
one: "ஒன்று",
platform: "தளம்",
forUsers: "பயனர்களுக்கு",
student: "மாணவர்",
aboutJobPortal: "JobPortal பற்றி",

careerStartsHere: "உங்கள் தொழில் பயணம் இங்கே தொடங்குகிறது",
loginWelcomeTitle: "உங்கள் அடுத்த",
loginWelcomeHighlight: "வாய்ப்பை வரவேற்கிறோம்.",
loginWelcomeDescription:
  "உங்கள் தொழில் வாழ்க்கையில் அடுத்த படியை எடுங்கள். வேலைவாய்ப்புகளைத் தேடி, நிறுவனங்களுடன் இணைந்து, உங்கள் இலக்குகளை நோக்கி முன்னேறுங்கள்.",
loginBenefitOneTitle: "வேலைவாய்ப்புகளைக் கண்டறியுங்கள்",
loginBenefitOneDescription:
  "உங்கள் திறன்களுக்கு ஏற்ற வேலைகளைத் தேடுங்கள்.",
loginBenefitTwoTitle: "உங்கள் சுயவிவரத்தை மேம்படுத்துங்கள்",
loginBenefitTwoDescription:
  "உங்கள் திறன்களையும் அனுபவத்தையும் நிறுவனங்களுக்குத் தெரியப்படுத்துங்கள்.",
loginBenefitThreeTitle: "உங்கள் விண்ணப்பங்களைக் கண்காணியுங்கள்",
loginBenefitThreeDescription:
  "உங்கள் வேலை விண்ணப்பங்களை ஒரே இடத்தில் நிர்வகியுங்கள்.",
loginWelcomeFooter: "உங்கள் அடுத்த பயணம் ஒரு படியில் தொடங்குகிறது.",
loginFormEyebrow: "உங்கள் கணக்கு",
welcomeBack: "மீண்டும் வரவேற்கிறோம்!",
loginSubtitle: "உங்கள் கணக்கில் நுழைய விவரங்களை உள்ளிடுங்கள்.",
username: "பயனர்பெயர்",
enterUsername: "உங்கள் பயனர்பெயரை உள்ளிடுங்கள்",
password: "கடவுச்சொல்",
enterPassword: "உங்கள் கடவுச்சொல்லை உள்ளிடுங்கள்",
loggingIn: "உள்நுழைகிறது...",
login: "உள்நுழை",
or: "அல்லது",
dontHaveAccount: "கணக்கு இல்லையா?",
createAccount: "கணக்கை உருவாக்கு",
loginSecurityNote: "உங்கள் கணக்கிற்கான அணுகல் பாதுகாக்கப்படுகிறது.",
enterLoginCredentials:
  "பயனர்பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடுங்கள்.",
loginSuccessful: "வெற்றிகரமாக உள்நுழைந்துவிட்டீர்கள்!",
invalidCredentials:
  "தவறான பயனர்பெயர் அல்லது கடவுச்சொல்.",


    // Register page - Tamil
    registerEyebrow: "உங்கள் தொழில் பயணம் இங்கே தொடங்குகிறது",
    registerWelcomeTitle: "உங்கள் எதிர்காலத்தை உருவாக்குங்கள்.",
    registerWelcomeHighlight: "உங்களுக்கான வாய்ப்பைக் கண்டறியுங்கள்.",
    registerWelcomeDescription:
      "வேலைவாய்ப்புகளைக் கண்டறியவும், நிறுவனங்களுடன் இணையவும், உங்கள் தொழில் வாழ்க்கையில் அடுத்த படியை எடுக்கவும் கணக்கை உருவாக்குங்கள்.",

    registerBenefitOneTitle: "வேலைவாய்ப்புகளைக் கண்டறியுங்கள்",
    registerBenefitOneDescription:
      "உங்கள் தொழில் இலக்குகளுக்குப் பொருத்தமான வேலைகளைத் தேடுங்கள்.",
    registerBenefitTwoTitle: "விண்ணப்பங்களை நிர்வகியுங்கள்",
    registerBenefitTwoDescription:
      "உங்கள் விண்ணப்பங்களை ஒரே இடத்தில் கண்காணியுங்கள்.",
    registerBenefitThreeTitle: "நிறுவனங்களுடன் இணையுங்கள்",
    registerBenefitThreeDescription:
      "உங்கள் திறன்களை வேலைவாய்ப்புகளாக மாற்றுங்கள்.",

    registerFormEyebrow: "தொடங்குங்கள்",
    registerTitle: "உங்கள் கணக்கை உருவாக்குங்கள்",
    registerSubtitle:
      "JobPortal-ல் இணைந்து உங்கள் தொழில் பயணத்தில் அடுத்த படியை எடுங்கள்.",

    emailAddress: "மின்னஞ்சல் முகவரி",
    enterEmail: "உங்கள் மின்னஞ்சலை உள்ளிடுங்கள்",
    chooseUsername: "பயனர்பெயரைத் தேர்ந்தெடுக்கவும்",
    createStrongPassword: "வலுவான கடவுச்சொல்லை உருவாக்குங்கள்",
    passwordHint:
      "வேறு இடங்களில் பயன்படுத்தாத வலுவான கடவுச்சொல்லைப் பயன்படுத்துங்கள்.",

    accountType: "கணக்கு வகை",
    studentJobSeeker: "மாணவர் / வேலை தேடுபவர்",
    companyEmployer: "நிறுவனம் / வேலை வழங்குபவர்",

    creatingAccount: "கணக்கு உருவாக்கப்படுகிறது...",
    createAccount: "பதிவு செய்",
    registerSuccess:
      "பதிவு வெற்றிகரமாக முடிந்தது! உள்நுழைவு பக்கத்திற்குச் செல்கிறோம்...",
    registerRequiredFields:
      "அனைத்து புலங்களையும் நிரப்பவும்.",
    registerFailed:
      "பதிவு தோல்வியடைந்தது. உங்கள் விவரங்களைச் சரிபார்க்கவும்.",
    registerConnectionError:
      "சேவையகத்துடன் இணைக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

    alreadyMember: "ஏற்கனவே உறுப்பினரா?",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    signIn: "உள்நுழையுங்கள்",
    registerSecurityNote:
      "உங்கள் தகவல்கள் பாதுகாப்பாகக் கையாளப்படுகின்றன.",
    registerFooter:
      "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

    // About page - Tamil
aboutBadge: "ஜாப் போர்டல் பற்றி",
heroTitle: "திறமைகளை இணைத்து",
heroTitleHighlight: " சிறந்த வாய்ப்புகளைப் பெறுங்கள்.",
heroDescription:
  "உங்கள் அடுத்த வேலைவாய்ப்பு இங்கே தொடங்குகிறது. மாணவர்கள், வேலை தேடுபவர்கள் மற்றும் நிறுவனங்களை ஒரே தளத்தில் JobPortal இணைக்கிறது.",
exploreJobs: "வேலைவாய்ப்புகளைப் பார்க்க",
discoverJobPortal: "JobPortal பற்றி அறிய",
platformNote: "மாணவர்கள், நிறுவனங்கள் மற்றும் நிர்வாகிகளுக்கான ஒரே தளம்",

yourNextChapter: "உங்கள் அடுத்த பயணம்",
visualTitle: "உங்கள் திறமைகளை வாய்ப்புகளாக மாற்றுங்கள்.",
visualDescription:
  "வாய்ப்புகளைக் கண்டறியுங்கள். தொடர்புகளை உருவாக்குங்கள். முன்னேறுங்கள்.",
createYourProfile: "உங்கள் சுயவிவரத்தை உருவாக்குங்கள்",
showcaseYourStrengths: "உங்கள் திறமைகளை வெளிப்படுத்துங்கள்",
exploreOpportunities: "வாய்ப்புகளைத் தேடுங்கள்",
findYourNextRole: "உங்களுக்கு ஏற்ற வேலையைக் கண்டறியுங்கள்",
takeNextStep: "அடுத்த படியை எடுங்கள்",
moveTowardsGoals: "உங்கள் இலக்குகளை நோக்கி முன்னேறுங்கள்",
findYourDirection: "உங்கள் பாதையைக் கண்டறியுங்கள்",
yourCareerJourney: "உங்கள் தொழில் பயணம்",
buildConnections: "தொடர்புகளை உருவாக்குங்கள்",
talentMeetsOpportunity: "திறமையும் வாய்ப்பும் சந்திக்கும் இடம்",

whoWeAre: "நாங்கள் யார்",
aboutHeading: "திறமைகளையும்",
aboutHeadingHighlight: " வாய்ப்புகளையும் இணைக்கும் சிறந்த வழி.",
aboutDescription1:
  "JobPortal என்பது வேலை தேடுபவர்களையும் நிறுவனங்களையும் எளிதாக இணைக்க உருவாக்கப்பட்ட இணையதள வேலைவாய்ப்புத் தளமாகும். வேலைவாய்ப்பு தொடர்பான முக்கிய செயல்பாடுகளை ஒரே இடத்தில் வழங்குகிறது.",
aboutDescription2:
  "மாணவர்கள் தங்கள் சுயவிவரத்தை உருவாக்கி, வேலைவாய்ப்புகளைத் தேடி, பொருத்தமான பணிகளுக்கு விண்ணப்பிக்கலாம். நிறுவனங்கள் தங்கள் விவரங்களைப் பகிர்ந்து, வேலைவாய்ப்புகளை வெளியிட்டு, விண்ணப்பங்களை நிர்வகிக்கலாம்.",
aboutDescription3:
  "மாணவர்கள், நிறுவனங்கள், வேலைவாய்ப்புகள் மற்றும் விண்ணப்பங்கள் தொடர்பான தகவல்களை ஒரே இடத்தில் நிர்வகிக்க நிர்வாகக் கட்டுப்பாட்டுப் பலகை உதவுகிறது.",
ourGoal: "எங்கள் நோக்கம்",
goalDescription:
  "வேலை தேடுதல் மற்றும் விண்ணப்பிக்கும் செயல்முறையை எளிமையாகவும் தெளிவாகவும் அனைவரும் அணுகக்கூடியதாகவும் மாற்றுவது.",

whatYouCanDo: "நீங்கள் செய்யக்கூடியவை",
featuresHeading: "உங்களுக்குத் தேவையான அனைத்தும்,",
featuresHeadingHighlight: " ஒரே இடத்தில்.",
featuresDescription:
  "மாணவர்கள், நிறுவனங்கள் மற்றும் தள நிர்வாகிகளுக்கு உதவும் அம்சங்களைப் பாருங்கள்.",

studentProfiles: "மாணவர் சுயவிவரங்கள்",
studentProfilesDescription:
  "உங்கள் கல்வி, திறன்கள் மற்றும் தொழில் ஆர்வங்களை வெளிப்படுத்தும் தொழில்முறை சுயவிவரத்தை உருவாக்குங்கள்.",
jobOpportunities: "வேலைவாய்ப்புகள்",
jobOpportunitiesDescription:
  "உங்கள் திறன்கள் மற்றும் தொழில் இலக்குகளுக்குப் பொருத்தமான வேலைவாய்ப்புகளைக் கண்டறியுங்கள்.",
companyProfiles: "நிறுவன சுயவிவரங்கள்",
companyProfilesDescription:
  "நிறுவனத்தின் சுயவிவரத்தை உருவாக்கி, உங்கள் நிறுவன விவரங்களை வேலை தேடுபவர்களுடன் பகிருங்கள்.",
jobApplications: "வேலை விண்ணப்பங்கள்",
jobApplicationsDescription:
  "பொருத்தமான பணிகளுக்கு விண்ணப்பித்து, விண்ணப்பத்தின் நிலையைத் தொடர்ந்து அறியுங்கள்.",
applicationManagement: "விண்ணப்ப மேலாண்மை",
applicationManagementDescription:
  "வேலை விண்ணப்பங்களை ஆய்வு செய்து, விண்ணப்பதாரர்களை நிர்வகிக்க நிறுவனங்களுக்கு உதவுங்கள்.",
adminManagement: "நிர்வாக மேலாண்மை",
adminManagementDescription:
  "மாணவர்கள், நிறுவனங்கள், வேலைவாய்ப்புகள் மற்றும் விண்ணப்பங்களைக் கண்காணிக்க நிர்வாகிகளுக்கு உதவும் கருவிகள்.",

ourTechStack: "பயன்படுத்திய தொழில்நுட்பங்கள்",
technologyHeading: "நவீன",
technologyHeadingHighlight: " இணையத் தொழில்நுட்பங்களால் உருவாக்கப்பட்டது.",
technologyDescription:
  "பதிலளிக்கும் முன்பக்க வடிவமைப்பு, பின்புற API-கள் மற்றும் தொடர்புடைய தரவுத்தளத்தை இணைக்கும் முழுமையான திட்டம்.",
frontendDevelopment: "முன்பக்க உருவாக்கம்",
backendApi: "பின்புற API",
programmingLanguage: "நிரலாக்க மொழி",
database: "தரவுத்தளம்",

projectDeveloper: "திட்டத்தை உருவாக்கியவர்",
developerEyebrow: "இந்தத் திட்டத்தின் பின்னணியில் உள்ளவர்",
developerRole: "MCA மாணவர் மற்றும் Python Backend Developer ஆக விரும்புபவர்",
developerDescription:
  "React.js, Django REST Framework, Python மற்றும் PostgreSQL ஆகியவற்றைப் பயன்படுத்தி இந்த முழுமையான இணையப் பயன்பாடு உருவாக்கப்பட்டது. இதில் முன்பக்க உருவாக்கம், பின்புற API-கள் மற்றும் தரவுத்தள மேலாண்மை ஆகியவை இணைக்கப்பட்டுள்ளன.",

ctaLabel: "உங்கள் அடுத்த படி இங்கே தொடங்குகிறது",
ctaHeading: "புதிய வாய்ப்புகளைத் தேடத் தயாரா?",
ctaDescription:
  "கிடைக்கக்கூடிய வேலைவாய்ப்புகளைக் கண்டறிந்து, உங்கள் தொழில் இலக்குகளை நோக்கி அடுத்த படியை எடுங்கள்.",
exploreOpportunitiesButton: "வாய்ப்புகளை ஆராயுங்கள்",


adminLoading: "டாஷ்போர்டு ஏற்றப்படுகிறது",
adminLoadingDescription:
  "உங்கள் விவரங்களைத் தயாரிக்கிறோம். சிறிது நேரம் காத்திருக்கவும்.",
adminLoadError: "டாஷ்போர்டை ஏற்ற முடியவில்லை",
adminLoadErrorDescription:
  "நிர்வாகியாக உள்நுழைந்து மீண்டும் முயற்சிக்கவும்.",
adminTryAgain: "மீண்டும் முயற்சிக்கவும்",

adminTotalStudents: "மொத்த மாணவர்கள்",
adminTotalCompanies: "மொத்த நிறுவனங்கள்",
adminTotalJobs: "மொத்த வேலைவாய்ப்புகள்",
adminTotalApplications: "மொத்த விண்ணப்பங்கள்",

adminStudentsDescription: "பதிவு செய்த வேலை தேடுபவர்கள்",
adminCompaniesDescription: "பதிவு செய்த வேலை வழங்குநர்கள்",
adminJobsDescription: "வெளியிடப்பட்ட வேலைவாய்ப்புகள்",
adminApplicationsDescription: "சமர்ப்பிக்கப்பட்ட விண்ணப்பங்கள்",

adminBrandLabel: "ஜாப் போர்டல் நிர்வாகம்",
adminDashboardTitle: "நிர்வாக டாஷ்போர்டு",
adminDashboardDescription:
  "தளத்தின் செயல்பாடுகள் மற்றும் வேலைவாய்ப்பு விவரங்களை ஒரே இடத்தில் கண்காணிக்கவும்.",
adminAdministrator: "நிர்வாகி",

adminPlatformOverview: "தளத்தின் கண்ணோட்டம்",
adminWelcomeTitle: "அனைத்து விவரங்களும் ஒரே பார்வையில்.",
adminWelcomeDescription:
  "மாணவர்கள், நிறுவனங்கள், வேலைவாய்ப்புகள் மற்றும் விண்ணப்பங்களை ஒரே இடத்தில் கண்காணிக்கவும்.",
adminPlatformStatistics: "தள புள்ளிவிவரங்கள்",
adminOverviewLabel: "கண்ணோட்டம்",

adminSummaryLabel: "தளச் சுருக்கம்",
adminOverviewTitle: "தளத்தின் கண்ணோட்டம்",
adminOverviewDescription:
  "தற்போதைய தள விவரங்களின் சுருக்கம்.",


applicantsLoading: "விண்ணப்பதாரர்கள் ஏற்றப்படுகிறார்கள்",
applicantsLoadingDescription: "விண்ணப்பங்களை ஏற்றும் வரை காத்திருக்கவும்.",
applicantsLoadError: "விண்ணப்பதாரர்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
applicationAccepted: "விண்ணப்பம் வெற்றிகரமாக ஏற்கப்பட்டது!",
applicationRejected: "விண்ணப்பம் நிராகரிக்கப்பட்டது!",
applicationUpdateError: "விண்ணப்பத்தைப் புதுப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
applicantsTryAgain: "மீண்டும் முயற்சிக்கவும்",
applicantsManagement: "விண்ணப்ப மேலாண்மை",
applicantsTitle: "விண்ணப்பதாரர்கள்",
applicantsDescription: "இந்த வேலைக்கான விண்ணப்பங்களைப் பரிசீலித்து நிர்வகிக்கவும்.",
applicantsTotal: "மொத்த விண்ணப்பதாரர்கள்",
noApplicantsTitle: "இன்னும் விண்ணப்பதாரர்கள் இல்லை",
noApplicantsDescription: "இந்த வேலைக்கு இதுவரை யாரும் விண்ணப்பிக்கவில்லை. புதிய விண்ணப்பங்கள் இங்கே தோன்றும்.",
applicantUnknown: "தெரியாத விண்ணப்பதாரர்",
applicantNotProvided: "வழங்கப்படவில்லை",
applicantSkills: "திறன்கள்",
applicantAppliedAt: "விண்ணப்பித்த நேரம்",
applicantViewResume: "ரெஸ்யூமைப் பார்க்க",
applicantProcessing: "செயல்படுத்தப்படுகிறது...",
applicantAccept: "ஏற்கவும்",
applicantReject: "நிராகரிக்கவும்",
applicationStatusAccepted: "ஏற்கப்பட்டது",
applicationStatusRejected: "நிராகரிக்கப்பட்டது",
applicationStatusPending: "நிலுவையில் உள்ளது",


companyLoadingTitle: "நிறுவன டாஷ்போர்டு ஏற்றப்படுகிறது",
companyLoadingDescription: "உங்கள் நிறுவன விவரங்களை ஏற்றும் வரை காத்திருக்கவும்.",
companyDashboardLoadError: "நிறுவன டாஷ்போர்டை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
companyDashboardErrorTitle: "ஏதோ தவறு ஏற்பட்டுள்ளது",
companyTryAgain: "மீண்டும் முயற்சிக்கவும்",
companyConfirmDelete: "இந்த வேலைவாய்ப்பை நிச்சயமாக நீக்க வேண்டுமா?",
companyJobDeleted: "வேலைவாய்ப்பு வெற்றிகரமாக நீக்கப்பட்டது!",
companyDeleteError: "வேலைவாய்ப்பை நீக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
companyDashboardLabel: "நிறுவனப் பணித்தளம்",
companyDefaultName: "உங்கள் நிறுவனம்",
companyDashboardDescription: "வேலைவாய்ப்புகளை நிர்வகித்து, தகுதியான விண்ணப்பதாரர்களைத் தொடர்புகொள்ளுங்கள்.",
companyPostNewJob: "புதிய வேலைவாய்ப்பைப் பதிவிடு",
companySummaryLabel: "நிறுவனப் புள்ளிவிவரங்கள்",
companyTotalJobs: "மொத்த வேலைவாய்ப்புகள்",
companyTotalApplicants: "மொத்த விண்ணப்பதாரர்கள்",
companyJobsSummary: "டாஷ்போர்டில் உள்ள வேலைவாய்ப்புகள்",
companyApplicantsSummary: "உங்கள் வேலைகளுக்கு விண்ணப்பித்தவர்கள்",
companyYourListings: "வேலைவாய்ப்பு நிர்வாகம்",
companyYourJobs: "உங்கள் வேலைவாய்ப்புகள்",
companyJobsDescription: "வேலைவாய்ப்புகளை நிர்வகித்து விண்ணப்பதாரர்களைப் பார்வையிடுங்கள்.",
companyJobsCountLabel: "வேலைவாய்ப்புகள்",
companyNoJobsTitle: "வேலைவாய்ப்புகள் எதுவும் பதிவிடப்படவில்லை",
companyNoJobsDescription: "இதுவரை நீங்கள் வேலைவாய்ப்புகளைப் பதிவிடவில்லை. விண்ணப்பதாரர்களைக் கண்டறிய முதல் வேலைவாய்ப்பைப் பதிவிடுங்கள்.",
companyPostFirstJob: "முதல் வேலைவாய்ப்பைப் பதிவிடு",
companyJobListing: "வேலைவாய்ப்பு",
companyApplicantsLabel: "விண்ணப்பதாரர்கள்",
companyLocationNotProvided: "இடம் குறிப்பிடப்படவில்லை",
companySalaryNotProvided: "சம்பளம் குறிப்பிடப்படவில்லை",
companyEdit: "திருத்து",
companyDelete: "நீக்கு",
companyDeleting: "நீக்கப்படுகிறது...",
companyViewApplicants: "விண்ணப்பதாரர்களைப் பார்க்க",


createJobEyebrow: "வேலைவாய்ப்பு",
createJobTitle: "புதிய வேலைவாய்ப்பை உருவாக்கு",
createJobDescription: "புதிய வேலைவாய்ப்பைப் பகிர்ந்து உங்கள் குழுவிற்குச் சரியான விண்ணப்பதாரர்களைக் கண்டறியுங்கள்.",
createJobTitleLabel: "வேலைப் பதவி",
createJobTitlePlaceholder: "எ.கா. Python Developer",
createJobDescriptionLabel: "வேலை விவரம்",
createJobDescriptionPlaceholder: "பணி, பொறுப்புகள் மற்றும் தேவையான தகுதிகளை விவரிக்கவும்...",
createJobDescriptionHint: "பொறுப்புகள், தேவையான திறன்கள் மற்றும் தகுதிகளைச் சேர்க்கவும்.",
createJobLocationLabel: "வேலை இடம்",
createJobLocationPlaceholder: "எ.கா. சென்னை",
createJobSalaryLabel: "சம்பளம் (ரூபாய்)",
createJobSalaryPlaceholder: "எ.கா. 25000",
createJobSalaryHint: "சம்பளத் தொகையை இந்திய ரூபாயில் உள்ளிடவும்.",
createJobCancel: "ரத்துசெய்",
createJobCreating: "உருவாக்கப்படுகிறது...",
createJobSubmit: "வேலைவாய்ப்பை உருவாக்கு",
createJobRequiredError: "தேவையான அனைத்து புலங்களையும் நிரப்பவும்.",
createJobSalaryError: "சரியான, எதிர்மறையற்ற சம்பளத் தொகையை உள்ளிடவும்.",
createJobSuccess: "வேலைவாய்ப்பு வெற்றிகரமாக உருவாக்கப்பட்டது!",
createJobFailure: "வேலைவாய்ப்பை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

editJobEyebrow: "வேலைவாய்ப்பு நிர்வாகம்",
editJobTitle: "வேலைவாய்ப்பைத் திருத்து",
editJobDescription: "உங்கள் வேலைவாய்ப்பு விவரங்களைப் புதுப்பிக்கவும்.",
editJobTitleLabel: "வேலைப் பதவி",
editJobTitlePlaceholder: "எ.கா. Python Developer",
editJobDescriptionLabel: "வேலை விவரம்",
editJobDescriptionPlaceholder: "பணி, பொறுப்புகள் மற்றும் தேவையான தகுதிகளை விவரிக்கவும்...",
editJobLocationLabel: "வேலை இடம்",
editJobLocationPlaceholder: "எ.கா. சென்னை",
editJobSalaryLabel: "சம்பளம் (ரூபாய்)",
editJobSalaryPlaceholder: "சம்பளத் தொகையை உள்ளிடவும்",
editJobSalaryHint: "சம்பளத் தொகையை இந்திய ரூபாயில் உள்ளிடவும்.",
editJobCancel: "ரத்துசெய்",
editJobUpdating: "புதுப்பிக்கப்படுகிறது...",
editJobSubmit: "வேலைவாய்ப்பைப் புதுப்பி",
editJobLoading: "வேலை விவரங்கள் ஏற்றப்படுகின்றன...",
editJobLoadError: "வேலை விவரங்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
editJobTryAgain: "மீண்டும் முயற்சிக்கவும்",
editJobValidationError: "அனைத்து புலங்களையும் சரியான விவரங்களுடன் நிரப்பவும்.",
editJobSuccess: "வேலைவாய்ப்பு வெற்றிகரமாகப் புதுப்பிக்கப்பட்டது!",
editJobUpdateError: "வேலைவாய்ப்பைப் புதுப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

forgotPasswordTitle: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
forgotPasswordDescription:
  "உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சல் முகவரியை உள்ளிடவும். கணக்கு இருந்தால், கடவுச்சொல்லை மீட்டமைப்பதற்கான இணைப்பு அனுப்பப்படும்.",
forgotPasswordEmailLabel: "மின்னஞ்சல் முகவரி",
forgotPasswordEmailPlaceholder:
  "உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சலை உள்ளிடவும்",
forgotPasswordSending: "அனுப்பப்படுகிறது...",
forgotPasswordSubmit: "மீட்டமைப்பு இணைப்பை அனுப்பு",
forgotPasswordSuccess:
  "இந்த மின்னஞ்சலுடன் கணக்கு இருந்தால், கடவுச்சொல்லை மீட்டமைப்பதற்கான வழிமுறைகள் அனுப்பப்படும்.",
forgotPasswordError:
  "உங்கள் கோரிக்கையைச் செயல்படுத்த முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
forgotPasswordBackToLogin: "← உள்நுழைவுக்குத் திரும்பு",

jobDetailsEyebrow: "வேலை விவரங்கள்",
jobDetailsLoading: "வேலை விவரங்கள் ஏற்றப்படுகின்றன...",
jobDetailsLoadError: "வேலை விவரங்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
jobDetailsNotFound: "வேலைவாய்ப்பு கிடைக்கவில்லை",
jobDetailsTryAgain: "மீண்டும் முயற்சிக்கவும்",
jobDetailsBack: "← வேலைவாய்ப்புகளுக்குத் திரும்பு",
jobDetailsLocationMissing: "இடம் குறிப்பிடப்படவில்லை",
jobDetailsSalaryLabel: "சம்பளம்",
jobDetailsSalaryMissing: "குறிப்பிடப்படவில்லை",
jobDetailsDescriptionTitle: "வேலை விவரம்",
jobDetailsDescriptionMissing: "வேலை விவரம் வழங்கப்படவில்லை.",
jobDetailsApply: "விண்ணப்பிக்கவும்",
jobDetailsApplying: "விண்ணப்பிக்கப்படுகிறது...",
jobDetailsApplied: "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது",
jobDetailsApplySuccess: "உங்கள் விண்ணப்பம் வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது!",
jobDetailsApplyError: "விண்ணப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

resetPasswordTitle: "புதிய கடவுச்சொல்லை அமைக்கவும்",
resetPasswordDescription: "உங்கள் கணக்கிற்குப் பாதுகாப்பான கடவுச்சொல்லைத் தேர்ந்தெடுக்கவும்.",
resetPasswordNewLabel: "புதிய கடவுச்சொல்",
resetPasswordNewPlaceholder: "புதிய கடவுச்சொல்லை உள்ளிடவும்",
resetPasswordConfirmLabel: "புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்",
resetPasswordConfirmPlaceholder: "புதிய கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
resetPasswordUpdating: "புதுப்பிக்கப்படுகிறது...",
resetPasswordSubmit: "கடவுச்சொல்லை மீட்டமை",
resetPasswordMismatch: "இரண்டு கடவுச்சொற்களும் பொருந்தவில்லை.",
resetPasswordRequired: "சரியான கடவுச்சொல்லை உள்ளிடவும்.",
resetPasswordSuccess: "உங்கள் கடவுச்சொல் வெற்றிகரமாக மீட்டமைக்கப்பட்டது.",
resetPasswordError: "கடவுச்சொல்லை மீட்டமைக்க முடியவில்லை. இணைப்பு தவறாக இருக்கலாம் அல்லது காலாவதியாகியிருக்கலாம்.",
resetPasswordBackToLogin: "← உள்நுழைவுக்குத் திரும்பு",

studentDashboardEyebrow: "மாணவர் பணித்தளம்",
studentDashboardTitle: "எனது விண்ணப்பங்கள்",
studentDashboardDescription: "உங்கள் வேலைவாய்ப்பு விண்ணப்பங்களையும் அவற்றின் தற்போதைய நிலையையும் கண்காணிக்கவும்.",
studentDashboardLoading: "உங்கள் விண்ணப்பங்கள் ஏற்றப்படுகின்றன...",
studentDashboardLoadError: "விண்ணப்பங்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
studentDashboardErrorTitle: "ஏதோ தவறு ஏற்பட்டுள்ளது",
studentDashboardTryAgain: "மீண்டும் முயற்சிக்கவும்",
studentDashboardSummary: "விண்ணப்பச் சுருக்கம்",
studentTotalApplications: "மொத்த விண்ணப்பங்கள்",
studentAccepted: "ஏற்கப்பட்டவை",
studentPending: "நிலுவையில் உள்ளவை",
studentRejected: "நிராகரிக்கப்பட்டவை",
studentNoApplicationsTitle: "விண்ணப்பங்கள் எதுவும் இல்லை",
studentNoApplicationsDescription: "நீங்கள் இதுவரை எந்த வேலைக்கும் விண்ணப்பிக்கவில்லை. கிடைக்கும் வேலைவாய்ப்புகளைப் பார்த்து உங்கள் முதல் விண்ணப்பத்தைச் சமர்ப்பிக்கவும்.",
studentBrowseJobs: "வேலைவாய்ப்புகளைப் பார்க்க",
studentRecentApplications: "சமீபத்திய விண்ணப்பங்கள்",
studentApplicationsSubtitle: "நீங்கள் சமர்ப்பித்த விண்ணப்பங்களின் நிலையை அறிந்துகொள்ளுங்கள்.",
studentApplicationsLabel: "விண்ணப்பங்கள்",
studentUnknownJob: "வேலைப் பதவி கிடைக்கவில்லை",
studentLocationMissing: "இடம் குறிப்பிடப்படவில்லை",
studentAppliedDate: "விண்ணப்பித்த தேதி",
studentDateMissing: "தேதி கிடைக்கவில்லை",
studentStatusAccepted: "ஏற்கப்பட்டது",
studentStatusRejected: "நிராகரிக்கப்பட்டது",
studentStatusPending: "நிலுவையில் உள்ளது",

profileEyebrow: "கணக்கு",
profileTitle: "உங்கள் சுயவிவரம்",
profileDescription: "உங்கள் தொழில்முறை விவரங்களை நிர்வகித்து, சுயவிவரத்தைப் புதுப்பித்த நிலையில் வைத்திருங்கள்.",
profileDashboard: "டாஷ்போர்டு",
profilePersonalInfo: "தனிப்பட்ட தகவல்கள்",
profilePersonalInfoDescription: "நிறுவனங்கள் உங்கள் சுயவிவரத்தைப் புரிந்துகொள்ள உதவும் தகவல்களைப் புதுப்பிக்கவும்.",
profilePhone: "தொலைபேசி எண்",
profilePhonePlaceholder: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
profileEducation: "கல்வித் தகுதி",
profileEducationPlaceholder: "எ.கா. MCA",
profileSkills: "திறன்கள்",
profileSkillsPlaceholder: "எ.கா. Python, Django, PostgreSQL, React JS",
profileSkillsHint: "உங்கள் அனுபவத்தை எடுத்துக்காட்டும் தொழில்நுட்பத் திறன்களைச் சேர்க்கவும்.",
profileReset: "மீட்டமை",
profileSaving: "சேமிக்கப்படுகிறது...",
profileSaveChanges: "மாற்றங்களைச் சேமி",
profileLoading: "உங்கள் சுயவிவரம் ஏற்றப்படுகிறது...",
profileLoadError: "சுயவிவரத்தை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
profileUpdateSuccess: "சுயவிவரம் வெற்றிகரமாகப் புதுப்பிக்கப்பட்டது!",
profileUpdateError: "சுயவிவரத்தைப் புதுப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
profileTipsTitle: "சிறந்த சுயவிவரத்தை உருவாக்குங்கள்",
profileTipsDescription: "முழுமையான சுயவிவரம் உங்கள் பின்னணி மற்றும் திறன்களை நிறுவனங்கள் புரிந்துகொள்ள உதவும்.",
profileTipEducation: "கல்வி விவரங்களைப் புதுப்பிக்கவும்",
profileTipSkills: "தொடர்புடைய தொழில்நுட்பத் திறன்களைச் சேர்க்கவும்",
profileTipAccuracy: "தகவல்களைச் சரியாக வைத்திருக்கவும்",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem("language");

    return savedLanguage === "tamil" ? "tamil" : "english";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-language", language);
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (newLanguage) => {
    if (newLanguage !== "english" && newLanguage !== "tamil") {
      return;
    }

    setLanguageState(newLanguage);
  };

  const t = (key) =>
    translations[language]?.[key] ??
    translations.english[key] ??
    key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
};