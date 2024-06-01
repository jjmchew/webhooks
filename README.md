# mini project

## Objectives
- deploy a mini React project to a VPS which uses:
  - postgres
  - mongo db
  - react front end

- this project is only intended to be a test demonstration of the various parts of the app working

### May 31, 2024 notes
- managed to deploy this project to Digital Ocean droplet (using containerized postgres and mongodb)

- initially used a regular Intel 1vCPU w/ 512 MB RAM
    - this had very unstable behaviour;  also relatively slow;  had to actually wait patiently for docker containers to startup and then run test scripts to connect to dbs afterwards
    - validated this through 2 terminals and running `docker compose up` with logging to terminal

- increasing RAM and CPU of droplet to: 1vCPU 2GB RAM made a huge improvement in speed
    - this droplet worked (`npm run testdb` worked as expected) and was considerably more stable


### May 31, 2024 notes
- (almost 24 hrs later)
- streamlined and re-built backend : currently deployed on dockerTest VPS
  - /api/new route works, but there's no data in the db
  - also, nginx needs to be fixed to allow access to backend to add requests

### June 1, 2024 notes
- the project now roughly works using "custom" sub-domains generated by the app
- summary:
  - a requestbin project
  - binNames are generated by the app and the back-end receives requests sent to the bin (using a subdomain URL)
  - managing the flow of http traffic through nginx and within express was the trick
    - learned that 301 redirects can change the http method to 'get', now using a 308 redirect in nginx
    - learned that nginx is probably better to conduct initial traffic flow, rather than sending all traffic to express
    - express can serve static files with an incorrect content-type header which created issues with firefox
    - for future learning, get more comfortable with nginx configs


