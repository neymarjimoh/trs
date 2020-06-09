
## About

This Project, TRS , is an application to handle, manage and automate the processes of the railway reservation system in Nigeria.

## Why

We decided to take on the problem of helping to find innovative ways that can help railway users  reserve and book trains avialable without needing to go through the stress of booking tickets physically at train stations where there are long and large queues.

We believe the Railway system is not taken as serious as it should, and this has made it more difficult for people to travel from place to place by trains.

With this app, we aim to make it easier for railway users to get access to available trains depending on their place and time of departure, with a confidential and cost effective approach.

## Usage

``

## Authors
- Odutoye Elijah Kolade <koladeodutoye9913@gmail.com>
- Jimoh Rildwan Adekunle <jemohkunle2007@gmail.com>

## Contributing

[![contributions welcome][contributions-welcome]][issues-url]

🤝 Contributions, issues and feature requests are welcome!
Feel free to check the [issues page][issues-url].

Also, If this project sounds interesting to you and you'd like to contribute and be part of it, thank you!
First, you can send a mail to jemohkunle2007@gmail.com and koladeodutoye9913@gmail.com to indicate your interest, why you'd like to support and what forms of support you can bring to the table.


## Acknowledgements


## LICENSE
[GPU](https://github.com/neymarjimoh/trs/blob/master/LICENSE)

## Documentation
[Blog API Documentation](https://documenter.getpostman.com/)

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/neymarjimoh/trs.git
cd trs
```

```bash
npm install
```

To run locally

```bash
npm run devStart
```

## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/neymarjimoh/trs.git
```

Step 2: Build the Docker image

```bash
docker build -t trs-app .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d trs-app
```

```bash
docker run -p 3000:3000 \
  -e JWT_SECRET=<JWT_SECRET> \
  -e MONGODB_URI=<MONGO_ATLAS_URL> \
  -d trs-app
```

<!-- MARKDOWN LINKS & IMAGES -->
[issues-url]: https://github.com/neymarjimoh/trs/issues
[contributions-welcome]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=for-the-badge
