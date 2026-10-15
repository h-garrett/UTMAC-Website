# UTMAC Website

## Members
 - Garrett H
 - Sean R

## New Members

 - Install node.js v24.21.0
 - Get MongoDB access to database
 - clone the repository 
 - run `npm ci`
 - create local .env file based on .env.example
    - Ask GH for ADMIN_PASSWORD_HASH
    - Generate SESSION_SECRET by running `console.log(require('crypto').randomBytes(32).toString('hex'))`
 - create a new branch, this is where any code you work on will go
 - within this branch, add your name to the README.
 - commit -> push changes
 - open a pull request on github


## Development Standards

When making changes to the website, all members should work on their own branches (e.g. `b-indigo` is Garrett's branch, etc.) and open a PR to request changes be merged with main. For now, PRs simply need to be approved by another member of the tech committee.

## ADMIN PAGE
The points below mention accessing the admin page. Here is how the admin page can be accessed:
- Navigate to musicclubatut.org/admin
- DM Garrett for password if you don't already have it

## Admin Page Fields
### Nomination Link: 
This is where the link to the nomination form goes. Make sure you submit after changing this field
### Voting Link: 
This is where the link to the voting form goes. Make sure you submit after changing this field
### Phase Override
 To explain what this does, it should be explained that the website automatically changes what "phase" it is in on Wednesday, Thursday, Friday, and Sunday at 10PM UTC (see below). If we want to **override** this behavior, we can use this field by checking the box and entering the phase we want to force the site into. This is commonly used over the weekend once the album of the week is determined so that we can announce the album on the site before the automatic phase change on Sunday night. In this case, we check the box, set the phase from **Closed->Listen**, and hit **Submit**. **Note that this override remains in place until it is undone manually**.
### Genre of the Week: 
See below. Set this to this week's genre on Wednesday night.

 ## Weekly Tasks

 These are the basic tasks which can and must be performed by any member of the tech committee on a weekly basis. 

 ### 10PM Wednesday: Open the nomination form and announce genre
 Typically after each meeting, the genre for the next week is announced and the nomination form is sent out to the discord later that night, usually at 10PM. At this time, an officer should ensure that the nomination link on the website links to this form. This can be done through the websites admin page. Once you are on the admin page, simply fill in the "nomination link" textbox with the new link, and click submit. Then, fill in the genre field with this week's genre, and submit that as well.

 ### 10PM Thursday: Open the voting form
 After the nomination phase concludes, the voting link needs to be updated! This is the same process as for updating the nomination link but with the "voting link" textbox on the admin page.

 ### WEEKEND: Announce the album of the week!
 Once voting is concluded at 10PM on Friday, open up the album voting Google Sheet and at the top bar, select `Functions->Ranked Choice Voting`. After some time, the script will tell you the album winner. You can open `Extensions->Apps Script` if you're interested in how tihs works (or how it doesn't). Message Garrett if you do not have access to the vote sheet. Next, the process is as follows. The order is important!
 
 - Download a .png of the album cover 
 - Add this image to `public/images/covers`
 - commit (no need for a PR in this case)
 - In MongoDB Atlas, connect to the DB (via the Data Explorer tab) and navigate to UTMAC->Albums
 - select Add Data
 - Add all of the album's info. This is how the album archive at the bottom of the website's home page is generated. When you hover over an album, you can see the title and artist, and when you click on it, it takes you to the url. The formatting should match that of all other entries. For urls, we are currently using Tidal but we may change them to Spotify urls, because who actually uses Tidal?


## TO DO LIST

### This is an ordered list of tasks that need to be carried out by the tech committee. Next to each task is a list of who these tasks are delegated to.

1. Create the officer page (`views/contact.ejs`). (BTW for those who don't know, .ejs is basically just HTML with added functionality, nothing scary). (Garrett, Sean, Cheryl)
2. Migrate nomination and voting forms to website. This will take a while (Garrett and Sean)
3. Re-style website (Cheryl)
