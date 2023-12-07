# The Tech we use

Helix AI is built upon a robust and diverse technological foundation that empowers its capabilities and
ensures seamless performance. Our tech stack combines cutting-edge frameworks, powerful programming
languages, and a network of third-party services to create a dynamic and innovative environment. From
the front-end powered by Next.js to the comprehensive back-end supported by Nest.js and TypeORM, every
component plays a pivotal role in delivering a top-tier experience. Our commitment to excellence extends
to testing, reporting, diagnostics, analytics, and containerization, making Helix AI a versatile and
dependable virtual assistant. Explore the layers of our technology stack to gain insight into the
machinery driving Helix AI's transformative potential.

## Frontend

The frontend of Helix AI leverages a collection of modern technologies and frameworks to provide users
with a seamless and visually appealing experience. These tools enable us to create an intuitive and responsive
user interface that enhances user interactions and engagement.

### Next.js

Next.js is a popular and powerful React framework that enables server-side rendering (SSR) and static
site generation (SSG). It provides a fast and efficient way to build modern web applications with React,
making it a key component of Helix AI's front-end architecture.

### React Native

React Native is a framework for building native mobile applications using React and JavaScript. With React
Native, we extend Helix AI's presence to mobile devices, ensuring a seamless and consistent user experience
across various platforms.

### Electron

Electron is an open-source framework that allows developers to build cross-platform desktop applications
using web technologies like HTML, CSS, and JavaScript. Helix AI leverages Electron to create a desktop
client, extending its reach to desktop users.

### React Redux

React Redux is a predictable state container for React applications. It plays a crucial role in managing
and synchronizing the state of Helix AI, ensuring efficient data flow and user interactions.

### Material-UI (@mui)

Material-UI, often abbreviated as @mui, is a popular React UI framework that provides a set of pre-designed
components with the Material Design aesthetic. It enhances Helix AI's user interface with a modern and visually
appealing design.

### Sass

Sass is a CSS preprocessor that offers enhanced capabilities for styling web applications. It allows for
organized and maintainable styling, which is essential for Helix AI's front-end development.

### PostCSS

PostCSS is a versatile tool for transforming CSS with JavaScript. It helps optimize and enhance the
performance and compatibility of Helix AI's stylesheets.

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework that simplifies the process of styling web applications. It
provides a set of utility classes that enable rapid development and customization of UI components.

### Axios

Axios is a popular JavaScript library for making HTTP requests. It facilitates communication between Helix AI's
front-end and back-end components, ensuring efficient data retrieval and updates.

### Styled Components

Styled Components is a library for styling React components using tagged template literals. It enables the
creation of styled, encapsulated components, enhancing the modularity and maintainability of Helix AI's
front-end code.

## Backend

The backend of Helix AI is powered by a robust stack of technologies and frameworks that enable efficient
data processing, communication, and management. These tools work together seamlessly to ensure the
reliability and scalability of the system.

### Nest.js

Nest.js is a progressive Node.js framework for building scalable and maintainable server-side applications.
It follows modern architectural patterns and provides a strong foundation for developing the backend of
Helix AI. Nest.js simplifies the creation of highly modular and testable code, making it an excellent
choice for our project.

### TypeORM

TypeORM is a powerful Object-Relational Mapping (ORM) library for TypeScript and JavaScript. It simplifies
database interactions by allowing developers to work with databases using TypeScript classes and decorators.
TypeORM is instrumental in managing the relational databases used in Helix AI, such as MySQL and PostgreSQL.

### GraphQL

GraphQL is a query language for APIs that allows clients to request only the data they need. Helix AI
leverages GraphQL to efficiently retrieve and manipulate data, reducing over-fetching and under-fetching
of information. This enhances the performance and responsiveness of our backend services.

### ioredis

ioredis is a high-performance, non-blocking Redis client for Node.js. It provides a reliable and efficient
way to interact with Redis, an in-memory cache used for caching frequently accessed data in Helix AI.
ioredis ensures quick data retrieval and minimizes the load on our backend services.

### mysql2

mysql2 is a Node.js-based MySQL library that facilitates database connections and queries. It's used
to interact with MySQL databases in Helix AI, ensuring data persistence and retrieval operations are
executed efficiently and securely.

### Socket.io

Socket.io is a real-time, bidirectional communication library that enables instant data exchange between
the server and clients. Helix AI employs Socket.io to support real-time features, such as chat and
notifications, enhancing user interactions and collaboration within the platform.

## Testing

Testing is a critical aspect of Helix AI's development process, ensuring the reliability, functionality,
and performance of the platform. We employ a range of testing tools and frameworks to thoroughly assess
our codebase.

### Jest

Jest is a widely used JavaScript testing framework maintained by Facebook. It is designed for simplicity
and ease of use while offering powerful testing capabilities. Helix AI uses Jest to perform unit testing,
ensuring that individual components and functions work correctly in isolation.

### Cypress

Cypress is an end-to-end testing framework for web applications. It allows us to write and run tests that
interact with Helix AI's frontend as if a user were interacting with it. Cypress helps identify and
address issues related to user experience and functionality, ensuring a seamless user journey.

### Pytest

Pytest is a testing framework for Python that simplifies the process of writing and executing test cases.
It is used to perform unit and integration testing for various backend components of Helix AI written in
Python. Pytest's flexibility and extensive ecosystem make it a valuable tool in our testing toolkit.

## Development Tools:

Effective development tools are essential for maintaining code quality, consistency, and collaboration
within the Helix AI project. Here are some of the key development tools we utilize:

### Husky

Husky is a tool that enables us to enforce code quality and standards by running scripts, such as linting
and testing, before allowing code commits. It helps prevent issues from entering our codebase and ensures
that all contributors follow best practices.

### Pre-Commit

Pre-Commit is a Git hook manager that integrates with Husky to execute specific actions before committing
code changes. It enables us to automate tasks like code formatting and linting, ensuring that every commit
meets our coding standards.

### Eslint

Eslint is a widely adopted JavaScript linter that analyzes code for potential errors and enforces a
consistent coding style. By using Eslint, we maintain code quality, catch issues early, and ensure
adherence to coding guidelines.

### Prettier

Prettier is an opinionated code formatter that automatically formats code according to predefined rules. It
helps us maintain a consistent code style across the Helix AI project, making the codebase more readable
and maintainable.

### Pnpm

Pnpm is a package manager for JavaScript projects that emphasizes speed and efficiency. It optimizes the
installation and management of project dependencies, reducing the project's overall footprint.

### Webpack

Webpack is a powerful and flexible module bundler for JavaScript applications. It plays a crucial role
in bundling and optimizing Helix AI's frontend code, ensuring efficient loading and performance.

### Babel

Babel is a JavaScript compiler that allows us to use the latest ECMAScript features and syntax. It
ensures backward compatibility with various browsers and environments, making our codebase accessible
to a wider audience.

## Reporting

Monitoring and reporting tools are integral to Helix AI's development process. They help us identify
issues, track performance, and maintain code quality. Here are some of the reporting tools we rely on:

### Sonar

Sonar is a platform for continuous code quality inspection. It provides detailed reports on code issues,
test coverage, and code smells. Sonar helps us maintain a clean and maintainable codebase by highlighting
areas that need improvement.

### Sentry

Sentry is an error tracking and monitoring tool that allows us to detect and diagnose issues in real-time.
It captures errors and exceptions across the application, providing insights into the root causes of
problems. Sentry helps us ensure a reliable and stable user experience.

### Datadog

Datadog is a comprehensive monitoring and analytics platform that helps us track the performance of Helix
AI's infrastructure and applications. It provides real-time visibility into system metrics, traces, and logs,
enabling us to optimize performance and troubleshoot issues proactively.

## Programming Languages

Helix AI employs a variety of programming languages to meet its diverse requirements. Each language is chosen
for its suitability to specific tasks and components within the project. Here are the programming languages
in use:

### JavaScript

JavaScript is the primary language for Helix AI's frontend development. It powers the interactive and dynamic
user interface, making user interactions smooth and responsive.

### Python

Python plays a critical role in Helix AI, particularly in the backend and data processing components. Its
versatility and extensive libraries support various functionalities, from AI-driven processing to data analysis.

### TypeScript

TypeScript is used alongside JavaScript, primarily for its strong typing system. It enhances code quality
and maintainability by catching type-related errors during development, ensuring a robust frontend.

### Bash

Bash scripting is employed for automation and deployment tasks. It allows us to create efficient scripts
for managing various aspects of Helix AI's infrastructure and operations.

### YAML

YAML is used for configuration and defining various aspects of Helix AI's setup. It simplifies the process
of configuring and deploying components across different environments, promoting consistency and ease of
management.

## Third-Party Services

Helix AI integrates with a range of third-party services to enhance its capabilities and provide a seamless
user experience. These services cover areas such as infrastructure, development, analytics, and user interaction.
Here are the third-party services used in the project:

### Cloudflare

Cloudflare provides security and performance solutions for websites and applications. Helix AI leverages Cloudflare
for content delivery, DDoS protection, and enhanced security.

### GitHub

GitHub is a widely-used platform for version control and collaboration. Helix AI relies on GitHub for source code
management, collaboration among developers, and issue tracking.

### Amazon AWS (Amazon Web Services)

Amazon AWS offers a suite of cloud computing services. Helix AI utilizes AWS for cloud hosting, serverless
computing, and various infrastructure components to ensure scalability and reliability.

### Mend Bolt

Mend Bolt is a service that provides automated dependency updates for open-source projects. Helix AI uses Mend
Bolt to keep its dependencies up to date, enhancing security and stability.

### Mend Renovate

Mend Renovate is a platform for automating and managing code updates and renovations. Helix AI employs Mend
Renovate to streamline code maintenance and improve code quality.

### Google Ad Service

Google Ad Service offers advertising solutions for digital marketing. Helix AI may utilize Google Ad Service for
promotional and marketing activities.

### Google Analytics

Google Analytics provides detailed insights into website and application usage. Helix AI leverages Google
Analytics to gather data on user interactions, helping to refine and improve the user experience.

### Stripe

Stripe is a payment processing platform. While details on its specific use within Helix AI may vary, it could be
used for handling subscription payments, donations, or other financial transactions.

## Containerization and Serverless

Helix AI relies on various containerization and serverless technologies to ensure efficient deployment, scalability,
and management of its components. These technologies enable flexible orchestration, robust DevOps practices,
efficient networking, diagnostics, and analytics. Here are the containerization and serverless technologies and
tools used in the project:

### Orchestration

#### Kubernetes

Kubernetes is a powerful container orchestration platform that automates the deployment, scaling, and management
of containerized applications. Helix AI uses Kubernetes to ensure the scalability and reliability of its
microservices.

#### Docker

Docker is a leading containerization platform that allows for the creation, deployment, and execution of
containers. Helix AI relies on Docker to package and distribute its application components in a consistent
and isolated environment.

#### Docker Compose

Docker Compose simplifies the management of multi-container Docker applications. It helps Helix AI define and
run multi-container applications, streamlining development and testing processes.

### DevOps

#### GitOps

GitOps is a set of practices that use Git repositories as a single source of truth for infrastructure and
application deployments. Helix AI employs GitOps principles for automated deployments and infrastructure management.

#### Flagger

Flagger is a Kubernetes operator that automates the progressive delivery of applications. Helix AI uses Flagger
to implement canary deployments and ensure smooth updates without service disruptions.

#### Spelunker

Spelunker is a tool that helps visualize and troubleshoot Kubernetes clusters. It assists Helix AI in monitoring
and diagnosing cluster issues, ensuring optimal performance.

#### Chaos Monkey

Chaos Monkey is a tool for testing the resilience of applications and infrastructure. Helix AI employs Chaos Monkey
to proactively identify weaknesses and vulnerabilities in its systems.

#### Kubescape

Kubescape is a security testing tool for Kubernetes environments. It helps Helix AI identify and remediate security
risks in its Kubernetes deployments.

#### Istio

Istio is a service mesh that enhances the visibility, control, and security of microservices. Helix AI uses Istio
to manage and secure communication between its microservices.

#### Jenkins

Jenkins is a widely-used open-source automation server. Helix AI leverages Jenkins for continuous integration and
continuous deployment (CI/CD) pipelines, automating testing and deployment processes.

### Networking

#### Cloudflared

Cloudflared is a tool that provides secure access to Cloudflare-protected resources. Helix AI uses Cloudflared for
secure communication with Cloudflare services.

#### Nginx Proxy and Nginx Ingress

Nginx Proxy and Nginx Ingress are used for load balancing, reverse proxying, and managing incoming traffic to Helix
AI's services. They ensure efficient routing and scalability.

### Diagnostics

#### ELK Stack (Elasticsearch, Logstash, Kibana)

The ELK Stack comprises Elasticsearch, Logstash, and Kibana, providing robust log management, data analysis, and
visualization capabilities. Helix AI relies on this stack for diagnostics, troubleshooting, and performance
monitoring.

#### Filebeat, Heartbeat, Packetbeat, Auditbeat

These Beats are lightweight agents used to send data from various sources to the ELK Stack. They help Helix AI
collect valuable telemetry data, monitor network health, and audit system activities.

#### Weave Scope

Weave Scope provides real-time visibility and monitoring of containerized applications. Helix AI utilizes Weave
Scope to gain insights into its Kubernetes clusters.

### Analytics

#### Grafana

Grafana is an open-source platform for monitoring and observability. Helix AI uses Grafana to create dashboards
and visualize data from various sources.

#### Prometheus

Prometheus is an open-source monitoring and alerting toolkit. Helix AI employs Prometheus to collect metrics and
trigger alerts based on predefined conditions.

#### Node Exporter

Node Exporter is a Prometheus exporter for system metrics. It helps Helix AI collect detailed information about
the performance of its infrastructure nodes.

### Miscellaneous

#### Consul

Consul is a service mesh and service discovery tool. Helix AI may utilize Consul for service registration, discovery,
and dynamic configuration.

#### Kafka

Kafka is a distributed streaming platform. While its specific use within Helix AI may vary, it can be employed for
event streaming and data integration.

#### RabbitMQ

RabbitMQ is a message broker. Helix AI may use RabbitMQ for asynchronous messaging between microservices.

#### Elasticsearch, Logstash, Kibana (ELK Stack)

In addition to diagnostics, the ELK Stack may be used by Helix AI for log-based searching, analysis, and visualization
in various contexts.
