# VotingSystem Module

A modern, secure electronic voting system built with Laravel 13, Inertia.js, and React. This module provides comprehensive election management capabilities for educational institutions and organizations.

## 🚀 Features

### Voter Features
- **Secure Authentication**: Multi-election voter login with password protection
- **Interactive Ballot**: User-friendly voting interface with candidate photos and information
- **Ballot Preview**: Review all selections before final submission
- **Real-time Results**: Live vote counting with interactive bar and pie charts
- **Feedback System**: Rich feedback submission with star ratings, experience levels, and improvement suggestions
- **Activity Tracking**: Comprehensive audit trail of all voter actions

### Admin Features
- **Election Management**: Full CRUD operations for elections with status control
- **Position Management**: Create and organize ballot positions with vote limits and ordering (move up/down)
- **Candidate Management**: Manage candidates with photo uploads and partylist affiliations
- **Partylist Management**: Organize candidates by political parties or groups
- **Voter Management**: Import voters via CSV or add manually with student integration
- **Results Dashboard**: Real-time results with interactive bar charts, pie charts, and detailed candidate lists
- **Activity Logs**: Monitor all voter activities with IP tracking, user agents, and metadata
- **Feedback Analytics**: View voter feedback with ratings breakdown and sentiment analysis
- **Votes Management**: View cast votes with reset capabilities (Super Admin only)

## 🛠️ Technology Stack

- **Backend**: Laravel 13
- **Frontend**: React 19 + TypeScript
- **SPA Framework**: Inertia.js v2
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Routing**: Laravel Wayfinder (type-safe routes)
- **Database**: MySQL
- **Authentication**: Laravel Fortify
- **Authorization**: Spatie Laravel Permission
- **Charts**: Shadcn Charts (Recharts)
- **Date Handling**: date-fns

## 📁 Module Structure

```
Modules/VotingSystem/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── ActivityLogController.php
│   │   │   │   ├── CandidateController.php
│   │   │   │   ├── ElectionController.php
│   │   │   │   ├── FeedbackController.php
│   │   │   │   ├── PartylistController.php
│   │   │   │   ├── PositionController.php
│   │   │   │   └── VoterManagementController.php
│   │   │   ├── BallotController.php
│   │   │   ├── FeedbackController.php
│   │   │   ├── ResultsController.php
│   │   │   └── VoterAuthController.php
│   │   └── Requests/
│   │       └── VoterLoginRequest.php
│   ├── Models/
│   │   ├── Candidate.php
│   │   ├── Election.php
│   │   ├── Partylist.php
│   │   ├── Position.php
│   │   ├── Vote.php
│   │   ├── Voter.php
│   │   ├── VoterActivityLog.php
│   │   └── VoterFeedback.php
│   └── Providers/
│       ├── EventServiceProvider.php
│       ├── RouteServiceProvider.php
│       └── VotingSystemServiceProvider.php
├── database/
│   ├── factories/         # Model factories for testing
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
├── routes/
│   ├── api.php           # API routes (reserved for future use)
│   └── web.php           # Web routes (voter + admin)
└── tests/
    ├── Feature/          # Feature tests
    └── Unit/             # Unit tests
```

## 🗄️ Database Schema

### Core Tables
- **elections**: Election configurations and settings
- **positions**: Ballot positions with ordering and vote limits
- **candidates**: Candidate information with photos and partylist affiliations
- **partylists**: Political parties or candidate groups
- **voters**: Voter credentials linked to students
- **votes**: Cast votes (encrypted and anonymized)
- **voter_activity_logs**: Comprehensive audit trail (login, ballot access, vote cast, results viewed, logout)
- **voter_feedback**: Rich feedback with ratings, experience, recommendations, and improvements

## 🔐 Security Features

- **Password Hashing**: Bcrypt encryption for voter passwords
- **CSRF Protection**: Laravel's built-in CSRF tokens
- **SQL Injection Prevention**: Eloquent ORM and parameterized queries
- **XSS Protection**: Automatic escaping in React components
- **Role-Based Access**: Spatie Permissions for admin/super-admin roles
- **Activity Logging**: IP tracking and user agent logging for audit compliance
- **Vote Anonymization**: Votes are stored separately from voter identities

## 📊 Key Models

### Election
- Manages election settings, status, and timing
- Relationships: positions, candidates, voters, votes, feedback, activity logs

### Position
- Defines ballot positions with ordering and vote limits
- Features: moveUp/moveDown methods for position reordering
- Relationships: election, candidates

### Candidate
- Stores candidate information with photo uploads
- Relationships: position, partylist, votes

### Voter
- Manages voter credentials and voting status
- Linked to Student model for institutional integration
- Relationships: election, votes, activity logs, feedback

### VoterActivityLog
- Comprehensive activity tracking with:
  - Actions: login, ballot_accessed, vote_cast, results_viewed, logout
  - IP address and user agent tracking
  - JSON metadata for additional context
  - Scopes for filtering by action, election, voter, date range

### VoterFeedback
- Rich feedback collection:
  - Star rating (1-5)
  - Experience level (excellent, good, average, poor)
  - Recommendation (yes/no)
  - Improvement suggestions (multiple checkboxes)
  - Open-ended comments
- Static methods for statistics and analytics

## 🌐 Routes

### Voter Routes (Public)
- `GET /voting/login` - Voter login page
- `POST /voting/authenticate` - Authenticate voter
- `GET /voting/ballot` - Display ballot (auth required)
- `POST /voting/preview` - Preview selections (auth required)
- `POST /voting/vote` - Submit vote (auth required)
- `GET /voting/confirmation` - Vote confirmation page
- `GET /voting/results/{election}` - View election results
- `GET /voting/feedback` - Feedback form (auth required)
- `POST /voting/feedback` - Submit feedback (auth required)
- `POST /voting/logout` - Logout voter

### Admin Routes (Protected)
All admin routes require authentication and appropriate roles.

#### Election Management
- `GET /voting/admin/elections` - List elections
- `GET /voting/admin/elections/create` - Create election form
- `POST /voting/admin/elections` - Store election
- `GET /voting/admin/elections/{election}` - View election
- `GET /voting/admin/elections/{election}/edit` - Edit election form
- `PATCH /voting/admin/elections/{election}` - Update election
- `DELETE /voting/admin/elections/{election}` - Delete election
- `POST /voting/admin/elections/{election}/toggle-status` - Start/stop election

#### Position Management
- `GET /voting/admin/positions` - List positions
- `POST /voting/admin/positions` - Create position
- `PATCH /voting/admin/positions/{position}` - Update position
- `DELETE /voting/admin/positions/{position}` - Delete position
- `POST /voting/admin/positions/{position}/move-up` - Move position up
- `POST /voting/admin/positions/{position}/move-down` - Move position down

#### Candidate Management
- `GET /voting/admin/candidates` - List candidates
- `POST /voting/admin/candidates` - Create candidate (with photo upload)
- `PATCH /voting/admin/candidates/{candidate}` - Update candidate
- `DELETE /voting/admin/candidates/{candidate}` - Delete candidate

#### Partylist Management
- `GET /voting/admin/partylists` - List partylists
- `POST /voting/admin/partylists` - Create partylist
- `PATCH /voting/admin/partylists/{partylist}` - Update partylist
- `DELETE /voting/admin/partylists/{partylist}` - Delete partylist

#### Voter Management
- `GET /voting/admin/voters` - List voters
- `POST /voting/admin/voters` - Create voter
- `POST /voting/admin/voters/import` - Import voters via CSV
- `PATCH /voting/admin/voters/{voter}` - Update voter
- `DELETE /voting/admin/voters/{voter}` - Delete voter

#### Results & Analytics
- `GET /voting/admin/results` - Results dashboard
- `GET /voting/admin/activity-logs` - Activity logs index
- `GET /voting/admin/activity-logs/{activity_log}` - View activity log details
- `GET /voting/admin/feedback` - Feedback analytics dashboard

#### Votes Management (Super Admin Only)
- `GET /voting/admin/votes` - View all cast votes
- `POST /voting/admin/votes/reset` - Reset votes for an election

## 🎨 Frontend Pages

All frontend pages are built with React + TypeScript and use Inertia.js for seamless SPA navigation.

### Voter Pages (resources/js/pages/voting/)
- `login.tsx` - Voter login with election selection
- `ballot.tsx` - Interactive voting interface
- `preview.tsx` - Review selections before submission
- `confirmation.tsx` - Vote confirmation success page
- `results.tsx` - Real-time results with shadcn bar charts, pie charts, and detailed candidate lists
- `feedback.tsx` - Rich feedback form with star ratings

### Admin Pages (resources/js/pages/voting/admin/)
- `elections/index.tsx` - Elections list with filters
- `elections/create.tsx` - Create election form
- `elections/edit.tsx` - Edit election form
- `elections/show.tsx` - Election details with tabs
- `positions/index.tsx` - Positions with up/down arrows
- `candidates/index.tsx` - Candidates with photo gallery
- `partylists/index.tsx` - Partylists management
- `voters/index.tsx` - Voters with CSV import
- `results/index.tsx` - Results dashboard with charts
- `activity-logs/index.tsx` - Activity logs with filters
- `activity-logs/show.tsx` - Activity log details
- `feedback/index.tsx` - Feedback analytics

## 🧪 Testing

Run module tests:
```bash
php artisan test --filter=VotingSystem
```

## 📝 Usage

### For Voters

1. **Login**: Navigate to `/voting/login`, select your election, and enter your credentials
2. **Vote**: Select candidates for each position (respect max vote limits)
3. **Preview**: Review your selections on the preview page
4. **Submit**: Confirm your vote (this action is final)
5. **Feedback**: Optionally provide feedback about your voting experience
6. **Results**: View live results after voting

### For Administrators

1. **Create Election**: Set up election name, code, and timing
2. **Add Positions**: Define ballot positions with vote limits and order
3. **Add Candidates**: Upload candidate information with photos
4. **Add Voters**: Import voters via CSV or add manually
5. **Start Election**: Activate the election when ready
6. **Monitor**: Track voter activity and participation
7. **View Results**: Analyze results with charts and export data
8. **Review Feedback**: Read voter feedback and ratings

## 🔄 Migration from Legacy System

This module is a complete rewrite of the legacy PHP voting system with the following improvements:

### ✅ Migrated Features
- All voter and admin functionality
- Position ordering (up/down)
- Ballot preview before submission
- Activity logging (enhanced)
- Feedback system (enhanced)
- Results visualization (enhanced)

### 🚀 New Features
- Type-safe routing with Wayfinder
- Real-time validation
- Responsive mobile-first design
- Enhanced security measures
- Rich feedback system with analytics
- Comprehensive activity tracking
- CSV voter import
- Better UX with loading states and animations
- Interactive shadcn charts (bar and pie) for results visualization

### 🗑️ Legacy Code Removed
All legacy PHP files, Blade views, and old assets have been completely removed. The module now runs entirely on Laravel 13 + Inertia.js + React.

## 👥 Development Team

- **Original Legacy System**: Kian A. Rodriguez, Princess Devilla, Francis Romero, Alpha Mae Valdez, Joan Manzano
- **Laravel Migration**: Maintained by Minsū Bongabong Campus IT Team
- **Faculty Advisor**: Sir Uriel Melendrez - College of Computer Studies

## 📄 License

© 2025 VotingSystem Module - Developed for Mindoro State University, Bongabong Campus

---

**Module Version**: 3.0.0  
**Laravel Version**: 13.x  
**Last Updated**: April 30, 2026