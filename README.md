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


