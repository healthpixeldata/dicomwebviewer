// // External

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import i18n from '@ohif/i18n';
// import { I18nextProvider } from 'react-i18next';
// import { BrowserRouter, type BrowserRouterProps } from 'react-router-dom';

// import Compose from './routes/Mode/Compose';
// import {
//   ExtensionManager,
//   CommandsManager,
//   HotkeysManager,
//   ServiceProvidersManager,
//   SystemContextProvider,
//   ViewportRefsProvider,
// } from '@ohif/core';
// import {
//   ThemeWrapper as ThemeWrapperNext,
//   NotificationProvider,
//   ViewportGridProvider,
//   DialogProvider,
//   CineProvider,
//   TooltipProvider,
//   Modal as ModalNext,
//   ManagedDialog,
//   ModalProvider,
//   ViewportDialogProvider,
//   UserAuthenticationProvider,
// } from '@ohif/ui-next';
// // Viewer Project
// // TODO: Should this influence study list?
// import { AppConfigProvider } from '@state';
// import createRoutes from './routes';
// import appInit from './appInit.js';
// import OpenIdConnectRoutes from './utils/OpenIdConnectRoutes';
// import { ShepherdJourneyProvider } from 'react-shepherd';
// import './App.css';

// let commandsManager: CommandsManager,
//   extensionManager: ExtensionManager,
//   servicesManager: AppTypes.ServicesManager,
//   serviceProvidersManager: ServiceProvidersManager,
//   hotkeysManager: HotkeysManager;

// const routerFutureFlags: BrowserRouterProps['future'] = {
//   v7_startTransition: true,
//   v7_relativeSplatPath: true,
// };

// function App({
//   config = {
//     /**
//      * Relative route from domain root that OHIF instance is installed at.
//      * For example:
//      *
//      * Hosted at: https://ohif.org/where-i-host-the/viewer/
//      * Value: `/where-i-host-the/viewer/`
//      * */
//     routerBasename: '/',
//     /**
//      *
//      */
//     showLoadingIndicator: true,
//     showStudyList: true,
//     oidc: [],
//     extensions: [],
//   },
//   defaultExtensions = [],
//   defaultModes = [],
// }) {
//   const [init, setInit] = useState(null);
//   useEffect(() => {
//     const run = async () => {
//       appInit(config, defaultExtensions, defaultModes).then(setInit).catch(console.error);
//     };

//     run();
//   }, []);
// useEffect(() => {
//   if (!init) return;

//   // Handle WebGL context errors from multiple tabs
//   const handleError = (event) => {
//     const msg = event.message || event.error?.message || '';
//     if (msg.includes('isAttributeUsed') || msg.includes('setMapperShaderParameters')) {
//       event.preventDefault();
//       console.warn('WebGL context error - too many tabs open. Try closing some OHIF tabs.');
//     }
//   };

//   const handleRejection = (event) => {
//     if (event.reason?.message?.includes('isAttributeUsed')) {
//       event.preventDefault();
//       console.warn('WebGL context error - too many tabs open.');
//     }
//   };

//   // Release WebGL resources when tab hidden
//   const handleVisibility = () => {
//     if (document.hidden) {
//       try {
//         const canvas = document.querySelector('canvas');
//         if (canvas) {
//           const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
//           if (gl) {
//             const ext = gl.getExtension('WEBGL_lose_context');
//             if (ext) {
//               ext.loseContext();
//               setTimeout(() => ext.restoreContext?.(), 100);
//             }
//           }
//         }
//       } catch (e) {
//         console.warn('Error managing WebGL:', e);
//       }
//     }
//   };

//   window.addEventListener('error', handleError, true);
//   window.addEventListener('unhandledrejection', handleRejection);
//   document.addEventListener('visibilitychange', handleVisibility);

//   return () => {
//     window.removeEventListener('error', handleError, true);
//     window.removeEventListener('unhandledrejection', handleRejection);
//     document.removeEventListener('visibilitychange', handleVisibility);
//   };
// }, [init]);
//   if (!init) {
//     return null;
//   }

//   // Set above for named export
//   commandsManager = init.commandsManager;
//   extensionManager = init.extensionManager;
//   servicesManager = init.servicesManager;
//   serviceProvidersManager = init.serviceProvidersManager;
//   hotkeysManager = init.hotkeysManager;

//   // Set appConfig
//   const appConfigState = init.appConfig;
//   const { routerBasename, modes, dataSources, oidc, showStudyList } = appConfigState;

//   // get the maximum 3D texture size
//   const canvas = document.createElement('canvas');
//   const gl = canvas.getContext('webgl2');

//   if (gl) {
//     const max3DTextureSize = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
//     appConfigState.max3DTextureSize = max3DTextureSize;
//   }

//   const {
//     uiDialogService,
//     uiModalService,
//     uiViewportDialogService,
//     viewportGridService,
//     cineService,
//     userAuthenticationService,
//     uiNotificationService,
//     customizationService,
//   } = servicesManager.services;

//   const providers = [
//     [AppConfigProvider, { value: appConfigState }],
//     [UserAuthenticationProvider, { service: userAuthenticationService }],
//     [I18nextProvider, { i18n }],
//     [ThemeWrapperNext],
//     [SystemContextProvider, { commandsManager, extensionManager, hotkeysManager, servicesManager }],
//     [ViewportRefsProvider],
//     [ViewportGridProvider, { service: viewportGridService }],
//     [ViewportDialogProvider, { service: uiViewportDialogService }],
//     [CineProvider, { service: cineService }],
//     [NotificationProvider, { service: uiNotificationService }],
//     [TooltipProvider],
//     [DialogProvider, { service: uiDialogService, dialog: ManagedDialog }],
//     [ModalProvider, { service: uiModalService, modal: ModalNext }],
//     [ShepherdJourneyProvider],
//   ];

//   // Loop through and register each of the service providers registered with the ServiceProvidersManager.
//   const providersFromManager = Object.entries(serviceProvidersManager.providers);
//   if (providersFromManager.length > 0) {
//     providersFromManager.forEach(([serviceName, provider]) => {
//       providers.push([provider, { service: servicesManager.services[serviceName] }]);
//     });
//   }

//   const CombinedProviders = ({ children }) => Compose({ components: providers, children });

//   let authRoutes = null;

//   // Should there be a generic call to init on the extension manager?
//   customizationService.init(extensionManager);

//   // Use config to create routes
//   const appRoutes = createRoutes({
//     modes,
//     dataSources,
//     extensionManager,
//     servicesManager,
//     commandsManager,
//     hotkeysManager,
//     routerBasename,
//     showStudyList,
//   });

//   if (oidc) {
//     authRoutes = (
//       <OpenIdConnectRoutes
//         oidc={oidc}
//         routerBasename={routerBasename}
//         userAuthenticationService={userAuthenticationService}
//       />
//     );
//   }

//   return (
//     <CombinedProviders>
//       <BrowserRouter
//         basename={routerBasename}
//         future={routerFutureFlags}
//       >
//         {authRoutes}
//         {appRoutes}
//       </BrowserRouter>
//     </CombinedProviders>
//   );
// }

// App.propTypes = {
//   config: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.shape({
//       routerBasename: PropTypes.string.isRequired,
//       oidc: PropTypes.array,
//       whiteLabeling: PropTypes.object,
//       extensions: PropTypes.array,
//     }),
//   ]).isRequired,
//   /* Extensions that are "bundled" or "baked-in" to the application.
//    * These would be provided at build time as part of they entry point. */
//   defaultExtensions: PropTypes.array,
//   /* Modes that are "bundled" or "baked-in" to the application.
//    * These would be provided at build time as part of they entry point. */
//   defaultModes: PropTypes.array,
// };

// export default App;

// export { commandsManager, extensionManager, servicesManager };


// External

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18n from '@ohif/i18n';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, type BrowserRouterProps } from 'react-router-dom';

import Compose from './routes/Mode/Compose';
import {
  ExtensionManager,
  CommandsManager,
  HotkeysManager,
  ServiceProvidersManager,
  SystemContextProvider,
  ViewportRefsProvider,
} from '@ohif/core';
import {
  ThemeWrapper as ThemeWrapperNext,
  NotificationProvider,
  ViewportGridProvider,
  DialogProvider,
  CineProvider,
  TooltipProvider,
  Modal as ModalNext,
  ManagedDialog,
  ModalProvider,
  ViewportDialogProvider,
  UserAuthenticationProvider,
} from '@ohif/ui-next';
import { AppConfigProvider } from '@state';
import createRoutes from './routes';
import appInit from './appInit.js';
import OpenIdConnectRoutes from './utils/OpenIdConnectRoutes';
import { ShepherdJourneyProvider } from 'react-shepherd';
import './App.css';

let commandsManager: CommandsManager,
  extensionManager: ExtensionManager,
  servicesManager: AppTypes.ServicesManager,
  serviceProvidersManager: ServiceProvidersManager,
  hotkeysManager: HotkeysManager;

const routerFutureFlags: BrowserRouterProps['future'] = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

function App({
  config = {
    routerBasename: '/',
    showLoadingIndicator: true,
    showStudyList: true,
    oidc: [],
    extensions: [],
  },
  defaultExtensions = [],
  defaultModes = [],
}) {
  const [init, setInit] = useState(null);

  useEffect(() => {
    const run = async () => {
      appInit(config, defaultExtensions, defaultModes).then(setInit).catch(console.error);
    };

    run();
  }, []);

  useEffect(() => {
    if (!init) return;

    let isReloading = false;

    const handleError = (event) => {
      const msg = event.message || event.error?.message || event.error?.stack || '';

      console.log('[WebGL Handler] Error detected:', msg);

      if ((msg.includes('isAttributeUsed') ||
           msg.includes('setMapperShaderParameters') ||
           msg.includes('Cannot read properties of null')) && !isReloading) {

        console.warn('[WebGL Handler] VTK mapper error caught - preventing error modal');
        console.warn('[WebGL Handler] Error details:', event.error);

        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();

        isReloading = true;

        console.warn('[WebGL Handler] Too many OHIF tabs open - WebGL context limit reached');
        console.warn('[WebGL Handler] Reloading page in 1 second...');

        setTimeout(() => {
          console.log('[WebGL Handler] Executing page reload now');
          window.location.reload();
        }, 1000);

        return false;
      }
    };

    const handleRejection = (event) => {
      const msg = event.reason?.message || event.reason?.stack || '';

      console.log('[WebGL Handler] Promise rejection detected:', msg);

      if ((msg.includes('isAttributeUsed') ||
           msg.includes('setMapperShaderParameters')) && !isReloading) {

        console.warn('[WebGL Handler] VTK mapper promise rejection caught');

        event.preventDefault();
        event.stopImmediatePropagation();

        isReloading = true;

        console.warn('[WebGL Handler] Reloading page due to promise rejection');

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    };

    console.log('[WebGL Handler] Installing error handlers');

    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleRejection, true);

    return () => {
      console.log('[WebGL Handler] Removing error handlers');
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleRejection, true);
    };
  }, [init]);

  if (!init) {
    return null;
  }

  commandsManager = init.commandsManager;
  extensionManager = init.extensionManager;
  servicesManager = init.servicesManager;
  serviceProvidersManager = init.serviceProvidersManager;
  hotkeysManager = init.hotkeysManager;

  const appConfigState = init.appConfig;
  const { routerBasename, modes, dataSources, oidc, showStudyList } = appConfigState;

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2');

  if (gl) {
    const max3DTextureSize = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
    appConfigState.max3DTextureSize = max3DTextureSize;
  }

  const {
    uiDialogService,
    uiModalService,
    uiViewportDialogService,
    viewportGridService,
    cineService,
    userAuthenticationService,
    uiNotificationService,
    customizationService,
  } = servicesManager.services;

  const providers = [
    [AppConfigProvider, { value: appConfigState }],
    [UserAuthenticationProvider, { service: userAuthenticationService }],
    [I18nextProvider, { i18n }],
    [ThemeWrapperNext],
    [SystemContextProvider, { commandsManager, extensionManager, hotkeysManager, servicesManager }],
    [ViewportRefsProvider],
    [ViewportGridProvider, { service: viewportGridService }],
    [ViewportDialogProvider, { service: uiViewportDialogService }],
    [CineProvider, { service: cineService }],
    [NotificationProvider, { service: uiNotificationService }],
    [TooltipProvider],
    [DialogProvider, { service: uiDialogService, dialog: ManagedDialog }],
    [ModalProvider, { service: uiModalService, modal: ModalNext }],
    [ShepherdJourneyProvider],
  ];

  const providersFromManager = Object.entries(serviceProvidersManager.providers);
  if (providersFromManager.length > 0) {
    providersFromManager.forEach(([serviceName, provider]) => {
      providers.push([provider, { service: servicesManager.services[serviceName] }]);
    });
  }

  const CombinedProviders = ({ children }) => Compose({ components: providers, children });

  let authRoutes = null;

  customizationService.init(extensionManager);

  const appRoutes = createRoutes({
    modes,
    dataSources,
    extensionManager,
    servicesManager,
    commandsManager,
    hotkeysManager,
    routerBasename,
    showStudyList,
  });

  if (oidc) {
    authRoutes = (
      <OpenIdConnectRoutes
        oidc={oidc}
        routerBasename={routerBasename}
        userAuthenticationService={userAuthenticationService}
      />
    );
  }

  return (
    <CombinedProviders>
      <BrowserRouter
        basename={routerBasename}
        future={routerFutureFlags}
      >
        {authRoutes}
        {appRoutes}
      </BrowserRouter>
    </CombinedProviders>
  );
}

App.propTypes = {
  config: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      routerBasename: PropTypes.string.isRequired,
      oidc: PropTypes.array,
      whiteLabeling: PropTypes.object,
      extensions: PropTypes.array,
    }),
  ]).isRequired,
  defaultExtensions: PropTypes.array,
  defaultModes: PropTypes.array,
};

export default App;

export { commandsManager, extensionManager, servicesManager };
