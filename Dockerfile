ARG PARENT_VERSION=1.2.1-node12.18.3

# Development
FROM defradigital/node-development:${PARENT_VERSION} AS development
ARG PARENT_VERSION
LABEL uk.gov.defra.ffc.parent-image=defradigital/node-development:${PARENT_VERSION}
ARG PORT_DEBUG=9229
EXPOSE ${PORT_DEBUG}
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
CMD [ "npm", "run", "start:watch" ]

# Production
FROM defradigital/node:${PARENT_VERSION} AS production
ARG PARENT_VERSION
LABEL uk.gov.defra.ffc.parent-image=defradigital/node:${PARENT_VERSION}
COPY --from=development /home/node/index.js /home/node/package*.json /home/node/
COPY --from=development /home/node/scripts/healthz  /home/node/scripts/healthz
COPY --from=development /home/node/app  /home/node/app
RUN npm ci
CMD [ "node", "app" ]
