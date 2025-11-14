# ThreadTales Micro-Frontend Architecture

This project demonstrates a micro-frontend architecture using Module Federation, React, and various patterns for state management and component communication.

## Getting Started

### Prerequisites

This project uses [pnpm](https://pnpm.io/) for package management and workspace support. Install pnpm if you haven't already:

```bash
npm install -g pnpm
```

### Installation

Install dependencies for all micro-frontends:

```bash
pnpm install
```

### Running All Services

Start all micro-frontends in parallel:

```bash
pnpm start
```

This will start all 6 services in parallel:
- **AppShell** (port 2000) - Main application shell
- **CatalogueMFE** (port 2002) - Product catalogue
- **HomeMFE** (port 2001) - Homepage
- **MyAccount** (port 2003) - User account management
- **UserDetails** (port 2004) - User details
- **UserPaymentMethods** (port 2005) - Payment methods

Press `Ctrl+C` to stop all services gracefully.

### Running Individual Services

Run a specific service:

```bash
pnpm run start --filter ./AppShell
pnpm run start --filter ./CatalogueMFE
pnpm run start --filter ./HomeMFE
pnpm run start --filter ./MyAccount
pnpm run start --filter ./UserDetails
pnpm run start --filter ./UserPaymentMethods
```

### Building

Build all services sequentially:

```bash
pnpm run build
```

Build all services in parallel:

```bash
pnpm run build:parallel
```

## Key Learnings

### 1. Module Federation Setup
- **Independent Deployment**: Each micro-frontend is configured as a standalone application with its own package.json, webpack configuration, and deployment pipeline. This allows teams to work independently and deploy without affecting other parts of the application.

- **Webpack Configuration**: 
  ```javascript
  // Example of proper webpack setup
  module.exports = {
    plugins: [
      new ModuleFederationPlugin({
        name: 'mfe_name',
        filename: 'remoteEntry.js',
        exposes: {
          './MFE': './src/Component'
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true }
        }
      })
    ]
  }
  ```
  Proper sharing of dependencies is crucial to avoid multiple instances of React and other libraries.

- **Selective Exposure**: Only expose components that need to be accessed by other MFEs. Internal components and utilities should remain private to the MFE.

- **Configuration Matching**: The exposed paths in webpack must match the paths defined in frontend-discovery.json to ensure proper loading:
  ```json
  {
    "microFrontends": {
      "UserPaymentMethods": [{
        "url": "http://localhost:2005",
        "extras": {
          "exposed": "MFE"
        }
      }]
    }
  }
  ```

### 2. React Components Communication
- **Props Reliability**: Props are the most reliable way to pass data across MFE boundaries. They work consistently because they're just JavaScript values:
  ```javascript
  <MFE emitter={emitter} data={someData} />
  ```

- **Context Limitations**: React Context doesn't work out of the box across MFE boundaries. While it can work when using a monorepo or shared library approach, this requires:
  ```javascript
  // Shared library approach
  // shared-lib/context.js
  const MyContext = React.createContext();
  export { MyContext };
  ```
  
  However, this approach requires:
  - Strong governance around the shared library
  - Careful version management
  - Team coordination for changes
  - Clear ownership and maintenance responsibilities
  
  Consider whether the complexity of maintaining a shared context library is worth it versus using simpler prop-based or event-based communication patterns.

- **Event Emitter Usage**: Event emitters provide a decoupled communication pattern between MFEs, avoiding the need to share domain objects through props:
  ```javascript
  // Good - Decoupled communication via events
  emitter.emit('paymentMethodUpdated', { id: '123' });
  
  // Avoid - Passing domain objects creates tight coupling
  <PaymentMFE 
    userAccount={complexUserObject} 
    paymentMethods={paymentMethodsArray}
  />
  ```
  
  Benefits of event-based communication:
  - Prevents hierarchical coupling in the DOM structure
  - MFEs can communicate without knowing about each other's internal structure
  - Easier to maintain and modify individual MFEs
  - Supports pub/sub patterns across the application
  - Allows for dynamic runtime communication without predefined prop structures

- **Class Components**: In our specific setup with Module Federation 2.0, class components have proven more reliable when dealing with lifecycle methods and prop handling:
  ```javascript
  class UserPaymentMethods extends React.Component {
    componentDidMount() {
      const { emitter } = this.props;
      emitter.on('notification', this.handleNotification);
    }
  }
  ```
  This is specific to Module Federation 2.0's implementation and should not be taken as a general rule for all micro-frontend architectures. Other MFE implementations might work equally well with functional components and hooks.

### 3. Micro-Frontends communication

- **Event Emitter Usage**: Event emitters work well for cross-MFE communication when direct prop passing isn't feasible:
  ```javascript
  // Emitting from one MFE
  emitter.emit('notification', { type: 'success', message: 'Updated!' });

  // Listening in another MFE
  emitter.on('notification', this.handleNotification);
  ```

- **Service Initialization**: Ensure services are properly initialized before use:
  ```javascript
  // In AppShell
  const emitter = new EventEmitter();
  await init({ name: 'shell' });
  ```

### 4. Component Loading
- **Suspense Usage**: Always wrap lazy-loaded MFEs with Suspense to handle loading states:
  ```javascript
  <Suspense fallback={<Loading />}>
    <MFE />
  </Suspense>
  ```

- **Loading States**: Implement meaningful loading states that maintain layout stability:
  ```javascript
  const Loading = () => (
    <div style={{ height: '400px', display: 'flex', alignItems: 'center' }}>
      <span>Loading...</span>
    </div>
  );
  ```

### 5. Multiple React Versions

One of the powerful features of Module Federation is the ability to run different React versions simultaneously in different MFEs. This is achieved through proper webpack configuration:

- **Isolated React Instances**: Each MFE can use its own React version by removing it from the shared dependencies:

```javascript
  // MFE using shared React 17 with custom shareScope
  new ModuleFederationPlugin({
    name: 'UserDetailsMFE',
    filename: 'remoteEntry.js',
    exposes: {
      './MFE': './src/UserDetails',
    },
    shared: {
      'react-router-dom': {
        singleton: true,
        requiredVersion: '6.21.3'
      },
      react: { 
        import: 'react',
        shareScope: 'react17',
        singleton: true,
        requiredVersion: '17.0.2'
      },
      'react-dom': { 
        import: 'react-dom',
        shareScope: 'react17-dom',
        singleton: true,
        requiredVersion: '17.0.2'
      }
    }
  })

  // MFE using shared React 18 (App Shell pattern)
  // webpack.config.js
  new ModuleFederationPlugin({
    name: 'HomeMFE',
    filename: 'remoteEntry.js',
    exposes: {
      './MFE': './src/App'
    },
    shared: {
      'react-router-dom': {
        singleton: true,
        requiredVersion: '6.21.3'
      },
      react: {
        singleton: true,
        requiredVersion: '18.2.0'
      },
      'react-dom': {
        singleton: true,
        requiredVersion: '18.2.0'
      }
    }
  })

  // App Shell (Host) configuration
  // webpack.config.js
  new ModuleFederationPlugin({
    name: 'shell',
    filename: 'remoteEntry.js',
    shared: {
      'react-router-dom': {
        singleton: true,
        requiredVersion: '6.21.3'
      },
      react: {
        singleton: true,
        requiredVersion: '18.2.0'
      },
      'react-dom': {
        singleton: true,
        requiredVersion: '18.2.0'
      }
    }
  })
  ```