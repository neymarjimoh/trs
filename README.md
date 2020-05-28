
## About

This Project, TRS , is an application to handle, manage and automate the processes of the railway reservation system in Nigeria.

## Why

We decided to take on the problem of helping to find innovative ways that can help railway users  reserve and book trains avialable without needing to go through the stress of booking tickets physically at train stations where there are long anrge queues.

We believe the Railway system is not taken as serious as it should, and this has made it more difficult for people to travel from place to place by trains.

With this app, we aim to railway users to available trains depending on their place and time of departure, with a confidential and cost effective approach.

## Usage

``

#### Hints

## Authors


## Contributing
If this project sounds interesting to you and you'd like to contribute, thank you!
First, you can send a mail to jemohkunle2007@gmail.com and koladeOdutoye@gmail.com to indicate your interest, why you'd like to support and what forms of support you can bring to the table, but here are areas we think we'd need the most help in this project :
1.  area two (e.g you want people to opt-in and try using your staging app at staging.project-name.com and report any bugs via a form)


## Acknowledgements


## LICENSE
MIT

## Documentation
[Blog API Documentation](https://documenter.getpostman.com/)

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
```

```bash
npm install
```

## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
```

Step 2: Build the Docker image

```bash
docker build -t trs-app.nodejs .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d trs-app.nodejs
```

```bash
docker run -p 3000:3000 \
  -e JWT_SECRET=<JWT_SECRET> \
  -e MONGODB_URI=<MONGO_ATLAS_URL> \
  -d trs-app.nodejs
```
