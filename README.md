# How to Run

`npm install`

`cd /client`

`npm install`

`cd ..`

`npm run dev`

## Server:

`server.js` Connects to MongoDb our API routes.

`/api/routes/` Path to our routes.

`/models/` Defines MongoDB schema.

## Client:

`/client/`: Folder containing all public client-facing files

## Test task description and time limit

You will be given a barebone project which you can install following the README.md file.
Build a simple web application that allows a user to create new contacts and associate them with a company.

The test has several tasks, and bonus tasks. The bonus tasks are designed to see as far as you go, and their number
should not be a source of frustration. Just keep working on them until the time runs out. We're going to evaluate the
code quality above having everything done.

Some contacts and companies have been prefilled in the database to aid you.

The time limit for this test is 90 minutes.

### Backend

Use the routes/api.contacts.js file and build endpoints to:

- GET /api/contacts: get all contacts
- POST /api/contacts: create a new contact
- GET /api/contacts/:id: get a single contact by id
- PUT /api/contacts/:id: update a contact by id

### Frontend

Evolve the React app in the client/ folder:

- Use Redux for state management. We use Axios to fetch data, but we won't be upset if you use fetch.
- Build a table for contacts with the headers: First Name, Last Name, Email, Phone Number, Company Name, a formatted Creation Date and an edit button.
- Add a 'Create New Contact' button which triggers a modal window with a form with fields for each of the fields in the model
- Make sure the Company associated with the contact is a dropdown with all the companies in the database
- Get the companies with a Redux action and store it in the Redux state
- Pressing the edit button should open a modal window with the form filled with the current contact's data. Add a save button to change the edits.

### Bonus tasks:

- Bonus: Build the whole UI with Material UI, try to use classes instead of inline styles
- Bonus 2: make the table paginated (server side pagination) with options of 5-10-20 items per page
- Bonus 3: use formik with validation to create / edit a new contact
- Bonus 4: Create a filter with a dropdown that filters the contacts by company name. The filtering should happen server-side
- Bonus 5: Write at least one unit test

### Tech stack for the test

MongoDB, Express, React, Node.js, Mongoose, Redux, Material UI
