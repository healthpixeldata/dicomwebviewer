// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// // Todo: we should move this component to composition and remove props base

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <NavBar
//         isSticky={isSticky}
//         {...props}
//       >
//         <div className="relative h-[48px] items-center">
//           <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//             <div
//               className={classNames(
//                 'mr-3 inline-flex items-center',
//                 isReturnEnabled && 'cursor-pointer'
//               )}
//               onClick={onClickReturn}
//               data-cy="return-to-work-list"
//             >
//               {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//               <div className="ml-1">
//                 {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-1/2 left-[250px] h-8 -translate-y-1/2">{Secondary}</div>
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
//             <div className="flex items-center justify-center space-x-2">{children}</div>
//           </div>
//           <div className="absolute right-0 top-1/2 flex -translate-y-1/2 select-none items-center">
//             {UndoRedo}
//             <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
//             {PatientInfo}
//             <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
//             <div className="flex-shrink-0">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-primary hover:bg-primary-dark mt-2 h-full w-full"
//                   >
//                     <Icons.GearSettings />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   {menuOptions.map((option, index) => {
//                     const IconComponent = option.icon
//                       ? Icons[option.icon as keyof typeof Icons]
//                       : null;
//                     return (
//                       <DropdownMenuItem
//                         key={index}
//                         onSelect={option.onClick}
//                         className="flex items-center gap-2 py-2"
//                       >
//                         {IconComponent && (
//                           <span className="flex h-4 w-4 items-center justify-center">
//                             <Icons.ByName name={option.icon} />
//                           </span>
//                         )}
//                         <span className="flex-1">{option.title}</span>
//                       </DropdownMenuItem>
//                     );
//                   })}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </div>
//       </NavBar>
//     </IconPresentationProvider>
//   );
// }

// export default Header;




// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <div className="flex flex-col">
//         {/* Top Bar - Logo, Patient Info, Settings */}
//         <NavBar
//           isSticky={isSticky}
//           {...props}
//         >
//           <div className="relative h-[48px] items-center">
//             <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//               <div
//                 className={classNames(
//                   'mr-3 inline-flex items-center',
//                   isReturnEnabled && 'cursor-pointer'
//                 )}
//                 onClick={onClickReturn}
//                 data-cy="return-to-work-list"
//               >
//                 {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//                 <div className="ml-1">
//                   {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//                 </div>
//               </div>
//             </div>
//             <div className="absolute right-0 top-1/2 flex -translate-y-1/2 select-none items-center">
//               {PatientInfo}
//               <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
//               <div className="flex-shrink-0">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-primary hover:bg-primary-dark mt-2 h-full w-full"
//                     >
//                       <Icons.GearSettings />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     {menuOptions.map((option, index) => {
//                       const IconComponent = option.icon
//                         ? Icons[option.icon as keyof typeof Icons]
//                         : null;
//                       return (
//                         <DropdownMenuItem
//                           key={index}
//                           onSelect={option.onClick}
//                           className="flex items-center gap-2 py-2"
//                         >
//                           {IconComponent && (
//                             <span className="flex h-4 w-4 items-center justify-center">
//                               <Icons.ByName name={option.icon} />
//                             </span>
//                           )}
//                           <span className="flex-1">{option.title}</span>
//                         </DropdownMenuItem>
//                       );
//                     })}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//         </NavBar>

//         {/* Second Toolbar - Tools */}
//         <div className="bg-black border-t border-black px-2 py-1">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               {Secondary}
//             </div>
//             <div className="flex items-center gap-2">
//               {children}
//             </div>
//             <div className="flex items-center gap-2">
//               {UndoRedo}
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconPresentationProvider>
//   );
// }

// export default Header;






//okok
// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <div className="flex flex-col">
//         {/* Top Bar - Logo, Patient Info (center), Settings */}
//         <NavBar
//           isSticky={isSticky}
//           {...props}
//         >
//           <div className="relative h-[48px] items-center">
//             <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//               <div
//                 className={classNames(
//                   'mr-3 inline-flex items-center',
//                   isReturnEnabled && 'cursor-pointer'
//                 )}
//                 onClick={onClickReturn}
//                 data-cy="return-to-work-list"
//               >
//                 {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//                 <div className="ml-1">
//                   {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//                 </div>
//               </div>
//             </div>

//             {/* Patient Info in Center */}
//             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
//               {PatientInfo}
//             </div>

//             <div className="absolute right-0 top-1/2 flex -translate-y-1/2 select-none items-center">
//               <div className="flex-shrink-0">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-primary hover:bg-primary-dark mt-2 h-full w-full"
//                     >
//                       <Icons.GearSettings />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     {menuOptions.map((option, index) => {
//                       const IconComponent = option.icon
//                         ? Icons[option.icon as keyof typeof Icons]
//                         : null;
//                       return (
//                         <DropdownMenuItem
//                           key={index}
//                           onSelect={option.onClick}
//                           className="flex items-center gap-2 py-2"
//                         >
//                           {IconComponent && (
//                             <span className="flex h-4 w-4 items-center justify-center">
//                               <Icons.ByName name={option.icon} />
//                             </span>
//                           )}
//                           <span className="flex-1">{option.title}</span>
//                         </DropdownMenuItem>
//                       );
//                     })}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//         </NavBar>

//         {/* Second Toolbar - Tools */}
//         <div className="bg-black border-t border-gray-800 px-2 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               {Secondary}
//             </div>
//             <div className="flex items-center gap-2">
//               {children}
//             </div>
//             <div className="flex items-center gap-2">
//               {UndoRedo}
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconPresentationProvider>
//   );
// }

// export default Header;











// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <style>{`
//         .responsive-patient {
//           transform: translate(-50%, -50%);
//         }
//         @media (max-width: 1200px) {
//           .responsive-logo { transform: scale(0.85); transform-origin: left; }
//           .responsive-patient { transform: translate(-50%, -50%) scale(0.85); }
//           .responsive-settings { width: 20px; height: 20px; }
//         }
//         @media (max-width: 900px) {
//           .responsive-logo { transform: scale(0.7); transform-origin: left; }
//           .responsive-patient { transform: translate(-50%, -50%) scale(0.7); }
//         }
//         @media (max-width: 600px) {
//           .responsive-logo { transform: scale(0.6); transform-origin: left; }
//           .responsive-patient { transform: translate(-50%, -50%) scale(0.6); }
//         }
//       `}</style>
//       <div className="flex flex-col">
//         <NavBar
//           isSticky={isSticky}
//           {...props}
//         >
//           <div className="relative h-[48px] items-center">
//             <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//               <div
//                 className={classNames(
//                   'mr-2 inline-flex items-center',
//                   isReturnEnabled && 'cursor-pointer'
//                 )}
//                 onClick={onClickReturn}
//                 data-cy="return-to-work-list"
//               >
//                 {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//                 <div className="ml-1 responsive-logo">
//                   {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//                 </div>
//               </div>
//             </div>

//             <div className="absolute left-1/2 top-1/2 responsive-patient">
//               {PatientInfo}
//             </div>

//             <div className="absolute right-0 top-1/2 flex -translate-y-1/2 select-none items-center">
//               <div className="flex-shrink-0">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-primary hover:bg-primary-dark mt-2 h-full w-full"
//                     >
//                       <Icons.GearSettings className="responsive-settings" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     {menuOptions.map((option, index) => {
//                       const IconComponent = option.icon
//                         ? Icons[option.icon as keyof typeof Icons]
//                         : null;
//                       return (
//                         <DropdownMenuItem
//                           key={index}
//                           onSelect={option.onClick}
//                           className="flex items-center gap-2 py-2"
//                         >
//                           {IconComponent && (
//                             <span className="flex h-4 w-4 items-center justify-center">
//                               <Icons.ByName name={option.icon} />
//                             </span>
//                           )}
//                           <span className="flex-1">{option.title}</span>
//                         </DropdownMenuItem>
//                       );
//                     })}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//         </NavBar>

//         <div className="bg-black border-t border-gray-800 px-2 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               {Secondary}
//             </div>
//             <div className="flex items-center gap-2">
//               {children}
//             </div>
//             <div className="flex items-center gap-2">
//               {UndoRedo}
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconPresentationProvider>
//   );
// }

// export default Header;












// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <style>{`
//         .responsive-patient {
//           transform: translateY(-50%);
//         }
//         @media (max-width: 1200px) {
//           .responsive-logo { transform: scale(0.85); transform-origin: left; }
//           .responsive-patient { transform: translateY(-50%) scale(0.85); }
//         }
//         @media (max-width: 900px) {
//           .responsive-logo { transform: scale(0.7); transform-origin: left; }
//           .responsive-patient { transform: translateY(-50%) scale(0.7); }
//         }
//         @media (max-width: 600px) {
//           .responsive-logo { transform: scale(0.6); transform-origin: left; }
//           .responsive-patient { transform: translateY(-50%) scale(0.6); }
//         }
//       `}</style>
//       <div className="flex flex-col">
//         <NavBar
//           isSticky={isSticky}
//           {...props}
//         >
//           <div className="relative h-[48px] items-center">
//             <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//               <div
//                 className={classNames(
//                   'mr-2 inline-flex items-center',
//                   isReturnEnabled && 'cursor-pointer'
//                 )}
//                 onClick={onClickReturn}
//                 data-cy="return-to-work-list"
//               >
//                 {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//                 <div className="ml-1 responsive-logo">
//                   {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//                 </div>
//               </div>
//             </div>

//             <div className="absolute right-1 top-1/2 responsive-patient">
//               {PatientInfo}
//             </div>
//           </div>
//         </NavBar>

//         <div className="bg-black border-t border-gray-800 px-2 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               {Secondary}
//             </div>
//             <div className="flex items-center gap-2">
//               {children}
//             </div>
//             <div className="flex items-center gap-2">
//               {UndoRedo}
//               <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
//               <div className="flex-shrink-0">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-primary hover:bg-primary-dark h-full w-full"
//                     >
//                       <Icons.GearSettings />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     {menuOptions.map((option, index) => {
//                       const IconComponent = option.icon
//                         ? Icons[option.icon as keyof typeof Icons]
//                         : null;
//                       return (
//                         <DropdownMenuItem
//                           key={index}
//                           onSelect={option.onClick}
//                           className="flex items-center gap-2 py-2"
//                         >
//                           {IconComponent && (
//                             <span className="flex h-4 w-4 items-center justify-center">
//                               <Icons.ByName name={option.icon} />
//                             </span>
//                           )}
//                           <span className="flex-1">{option.title}</span>
//                         </DropdownMenuItem>
//                       );
//                     })}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconPresentationProvider>
//   );
// }

// export default Header;







//perfect
// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <style>{`
//   .responsive-patient {
//     transform: translateY(-50%);
//     position: absolute;
//     right: 4px;
//   }
//   @media (max-width: 1200px) {
//     .responsive-logo { transform: scale(0.85); transform-origin: left; }
//     .responsive-patient {
//       transform: translateY(-50%) scale(0.85);
//       right: 4px;
//       transform-origin: right;
//     }
//   }
//   @media (max-width: 900px) {
//     .responsive-logo { transform: scale(0.7); transform-origin: left; }
//     .responsive-patient {
//       transform: translateY(-50%) scale(0.7);
//       right: 4px;
//       transform-origin: right;
//     }
//   }
//   @media (max-width: 600px) {
//     .responsive-logo { transform: scale(0.6); transform-origin: left; }
//     .responsive-patient {
//       transform: translateY(-50%) scale(0.6);
//       right: 4px;
//       transform-origin: right;
//     }
//   }
// `}</style>
//       <div className="flex flex-col">
//         <NavBar
//           isSticky={isSticky}
//           {...props}
//         >
//           <div className="relative h-[48px] items-center">
//             <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//               <div
//                 className={classNames(
//                   'mr-2 inline-flex items-center',
//                   isReturnEnabled && 'cursor-pointer'
//                 )}
//                 onClick={onClickReturn}
//                 data-cy="return-to-work-list"
//               >
//                 {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//                 <div className="ml-1 responsive-logo">
//                   {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//                 </div>
//               </div>
//             </div>

//             <div className="top-1/2 responsive-patient">
//               {PatientInfo}
//             </div>
//           </div>
//         </NavBar>

//         <div className="bg-black border-t border-gray-800 px-2 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               {Secondary}
//             </div>
//             <div className="flex items-center gap-2">
//               {children}
//             </div>
//             <div className="flex items-center gap-2">
//               {UndoRedo}
//               <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
//               <div className="flex-shrink-0">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-primary hover:bg-primary-dark flex items-center justify-center"
//                     >
//                       <Icons.GearSettings />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     {menuOptions.map((option, index) => {
//                       const IconComponent = option.icon
//                         ? Icons[option.icon as keyof typeof Icons]
//                         : null;
//                       return (
//                         <DropdownMenuItem
//                           key={index}
//                           onSelect={option.onClick}
//                           className="flex items-center gap-2 py-2"
//                         >
//                           {IconComponent && (
//                             <span className="flex h-4 w-4 items-center justify-center">
//                               <Icons.ByName name={option.icon} />
//                             </span>
//                           )}
//                           <span className="flex-1">{option.title}</span>
//                         </DropdownMenuItem>
//                       );
//                     })}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconPresentationProvider>
//   );
// }

// export default Header;











// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <style>{`
//         .responsive-patient {
//           transform: translateY(-50%);
//           position: absolute;
//           right: 4px;
//         }
//         .responsive-right-tools {
//           transform: scale(1);
//         }
//         .responsive-left-tools {
//           transform: scale(1);
//           transform-origin: left;
//         }
//         @media (max-width: 1200px) {
//           .responsive-logo {
//             transform: scale(0.85);
//             transform-origin: left;
//           }
//           .responsive-patient {
//             transform: translateY(-50%) scale(0.85);
//             right: 4px;
//             transform-origin: right;
//           }
//           .responsive-left-tools {
//             transform: scale(0.9);
//             transform-origin: left;
//           }
//           .responsive-right-tools {
//             transform: scale(0.9);
//             transform-origin: right;
//           }
//         }
//         @media (max-width: 900px) {
//           .responsive-logo {
//             transform: scale(0.7);
//             transform-origin: left;
//           }
//           .responsive-patient {
//             transform: translateY(-50%) scale(0.7);
//             right: 4px;
//             transform-origin: right;
//           }
//           .responsive-left-tools {
//             transform: scale(0.8);
//             transform-origin: left;
//           }
//           .responsive-right-tools {
//             transform: scale(0.8);
//             transform-origin: right;
//           }
//         }
//         @media (max-width: 600px) {
//           .responsive-logo {
//             transform: scale(0.6);
//             transform-origin: left;
//           }
//           .responsive-patient {
//             transform: translateY(-50%) scale(0.6);
//             right: 4px;
//             transform-origin: right;
//           }
//           .responsive-left-tools {
//             transform: scale(0.7);
//             transform-origin: left;
//           }
//           .responsive-right-tools {
//             transform: scale(0.7);
//             transform-origin: right;
//           }
//         }
//         .toolbar-scroll {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//         .toolbar-scroll::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//       <div className="flex flex-col">
//         <NavBar
//           isSticky={isSticky}
//           {...props}
//         >
//           <div className="relative h-[48px] items-center">
//             <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//               <div
//                 className={classNames(
//                   'mr-2 inline-flex items-center',
//                   isReturnEnabled && 'cursor-pointer'
//                 )}
//                 onClick={onClickReturn}
//                 data-cy="return-to-work-list"
//               >
//                 {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//                 <div className="ml-1 responsive-logo">
//                   {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//                 </div>
//               </div>
//             </div>

//             <div className="top-1/2 responsive-patient">
//               {PatientInfo}
//             </div>
//           </div>
//         </NavBar>

//         <div className="bg-black border-t border-gray-800 py-2 relative">
//          <div className="px-1 py-2 overflow-x-auto toolbar-scroll h-full">
//   <div className="flex items-center gap-2 responsive-left-tools h-full min-w-max pr-[180px]">
//     {Secondary}
//     {children}
//   </div>
// </div>
//           <div className="absolute right-1 top-0 h-full flex items-center flex items-center gap-2 responsive-right-tools bg-black pl-4">
//             {UndoRedo}
//             <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
//             <div className="flex-shrink-0">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-primary hover:bg-primary-dark flex items-center justify-center"
//                   >
//                     <Icons.GearSettings />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   {menuOptions.map((option, index) => {
//                     const IconComponent = option.icon
//                       ? Icons[option.icon as keyof typeof Icons]
//                       : null;
//                     return (
//                       <DropdownMenuItem
//                         key={index}
//                         onSelect={option.onClick}
//                         className="flex items-center gap-2 py-2"
//                       >
//                         {IconComponent && (
//                           <span className="flex h-4 w-4 items-center justify-center">
//                             <Icons.ByName name={option.icon} />
//                           </span>
//                         )}
//                         <span className="flex-1">{option.title}</span>
//                       </DropdownMenuItem>
//                     );
//                   })}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconPresentationProvider>
//   );
// }

// export default Header;















//Good
// import React, { ReactNode } from 'react';
// import classNames from 'classnames';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   Icons,
//   Button,
//   ToolButton,
// } from '../';
// import { IconPresentationProvider } from '@ohif/ui-next';

// import NavBar from '../NavBar';

// interface HeaderProps {
//   children?: ReactNode;
//   menuOptions: Array<{
//     title: string;
//     icon?: string;
//     onClick: () => void;
//   }>;
//   isReturnEnabled?: boolean;
//   onClickReturnButton?: () => void;
//   isSticky?: boolean;
//   WhiteLabeling?: {
//     createLogoComponentFn?: (React: any, props: any) => ReactNode;
//   };
//   PatientInfo?: ReactNode;
//   Secondary?: ReactNode;
//   UndoRedo?: ReactNode;
// }

// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   PatientInfo,
//   UndoRedo,
//   Secondary,
//   ...props
// }: HeaderProps): ReactNode {
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <IconPresentationProvider
//       size="large"
//       IconContainer={ToolButton}
//     >
//       <style>{`
//         .responsive-patient {
//           transform: translateY(-50%);
//           position: absolute;
//           right: 4px;
//         }
//         .responsive-right-tools {
//           transform: scale(1);
//         }
//         .responsive-left-tools {
//           transform: scale(1);
//           transform-origin: left;
//         }
//         @media (max-width: 1200px) {
//           .responsive-logo {
//             transform: scale(0.85);
//             transform-origin: left;
//           }
//           .responsive-patient {
//             transform: translateY(-50%) scale(0.85);
//             right: 4px;
//             transform-origin: right;
//           }
//           .responsive-left-tools {
//             transform: scale(0.9);
//             transform-origin: left;
//           }
//           .responsive-right-tools {
//             transform: scale(0.9);
//             transform-origin: right;
//           }
//         }
//         @media (max-width: 900px) {
//           .responsive-logo {
//             transform: scale(0.7);
//             transform-origin: left;
//           }
//           .responsive-patient {
//             transform: translateY(-50%) scale(0.7);
//             right: 4px;
//             transform-origin: right;
//           }
//           .responsive-left-tools {
//             transform: scale(0.8);
//             transform-origin: left;
//           }
//           .responsive-right-tools {
//             transform: scale(0.8);
//             transform-origin: right;
//           }
//         }
//         @media (max-width: 600px) {
//           .responsive-logo {
//             transform: scale(0.6);
//             transform-origin: left;
//           }
//           .responsive-patient {
//             transform: translateY(-50%) scale(0.6);
//             right: 4px;
//             transform-origin: right;
//           }
//           .responsive-left-tools {
//             transform: scale(0.7);
//             transform-origin: left;
//           }
//           .responsive-right-tools {
//             transform: scale(0.7);
//             transform-origin: right;
//           }
//         }
//         .toolbar-scroll {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//         .toolbar-scroll::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//       <div className="flex flex-col">
//         <NavBar
//           isSticky={isSticky}
//           {...props}
//         >
//           <div className="relative h-[48px] items-center">
//             <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//               <div
//                 className={classNames(
//                   'mr-2 inline-flex items-center',
//                   isReturnEnabled && 'cursor-pointer'
//                 )}
//                 onClick={onClickReturn}
//                 data-cy="return-to-work-list"
//               >
//                 {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
//                 <div className="ml-1 responsive-logo">
//                   {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
//                 </div>
//               </div>
//             </div>

//             <div className="top-1/2 responsive-patient">
//               {PatientInfo}
//             </div>
//           </div>
//         </NavBar>

//         <div className="bg-black border-t border-gray-800 relative h-[38px]">
//           <div className="absolute left-0 right-0 top-0 bottom-0 overflow-x-auto overflow-y-hidden toolbar-scroll flex items-center">
//             <div className="flex items-center gap-2 responsive-left-tools whitespace-nowrap pl-2">
//               {Secondary}
//               {children}
//             </div>
//             <div style={{ width: '50px', minWidth: '50px', height: '1px' }}></div>
//           </div>
//           <div className="absolute right-1 top-0 h-full flex items-center gap-2 responsive-right-tools bg-black pl-4">
//             {UndoRedo}
//             <div className="border-primary-dark mx-1.5 h-[20px] border-r"></div>
//             <div className="flex-shrink-0">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-primary hover:bg-primary-dark flex items-center justify-center"
//                   >
//                     <Icons.GearSettings />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   {menuOptions.map((option, index) => {
//                     const IconComponent = option.icon
//                       ? Icons[option.icon as keyof typeof Icons]
//                         : null;
//                     return (
//                       <DropdownMenuItem
//                         key={index}
//                         onSelect={option.onClick}
//                         className="flex items-center gap-2 py-2"
//                       >
//                         {IconComponent && (
//                           <span className="flex h-4 w-4 items-center justify-center">
//                             <Icons.ByName name={option.icon} />
//                           </span>
//                         )}
//                         <span className="flex-1">{option.title}</span>
//                       </DropdownMenuItem>
//                     );
//                   })}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconPresentationProvider>
//   );
// }

// export default Header;












import React, { ReactNode, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Icons,
  Button,
  ToolButton,
} from '../';
import { IconPresentationProvider } from '@ohif/ui-next';

import NavBar from '../NavBar';

interface HeaderProps {
  children?: ReactNode;
  menuOptions: Array<{
    title: string;
    icon?: string;
    onClick: () => void;
  }>;
  isReturnEnabled?: boolean;
  onClickReturnButton?: () => void;
  isSticky?: boolean;
  WhiteLabeling?: {
    createLogoComponentFn?: (React: any, props: any) => ReactNode;
  };
  PatientInfo?: ReactNode;
  Secondary?: ReactNode;
  UndoRedo?: ReactNode;
}

function Header({
  children,
  menuOptions,
  isReturnEnabled = true,
  onClickReturnButton,
  isSticky = false,
  WhiteLabeling,
  PatientInfo,
  UndoRedo,
  Secondary,
  ...props
}: HeaderProps): ReactNode {
  const toolbarScrollRef = useRef<HTMLDivElement>(null);
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const rightButtonsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [toolbarWidth, setToolbarWidth] = useState(0);
  const [toolsWidth, setToolsWidth] = useState(0);

  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      if (toolbarScrollRef.current && toolsContainerRef.current) {
        const scrollContainer = toolbarScrollRef.current;
        const toolsContainer = toolsContainerRef.current;

        const availableWidth = scrollContainer.offsetWidth;
        const contentWidth = toolsContainer.scrollWidth;

        setToolbarWidth(availableWidth);
        setToolsWidth(contentWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [children, Secondary, UndoRedo]);

  const shouldCenter = !isMobile && toolsWidth < toolbarWidth;

  return (
    <IconPresentationProvider
      size="large"
      IconContainer={ToolButton}
    >
      {/* <style>{`
        .responsive-patient {
          transform: translateY(-50%);
          position: absolute;
          right: 4px;
        }
        .responsive-right-tools {
          transform: scale(1);
        }
        .responsive-left-tools {
          transform: scale(1);
          transform-origin: left;
        }
        @media (max-width: 1200px) {
          .responsive-logo {
            transform: scale(0.85);
            transform-origin: left;
          }
          .responsive-patient {
            transform: translateY(-50%) scale(0.85);
            right: 4px;
            transform-origin: right;
          }
          .responsive-left-tools {
            transform: scale(0.9);
            transform-origin: left;
          }
          .responsive-right-tools {
            transform: scale(0.9);
            transform-origin: right;
          }
        }
        @media (max-width: 900px) {
          .responsive-logo {
            transform: scale(0.7);
            transform-origin: left;
          }
          .responsive-patient {
            transform: translateY(-50%) scale(0.7);
            right: 4px;
            transform-origin: right;
          }
          .responsive-left-tools {
            transform: scale(0.8);
            transform-origin: left;
          }
          .responsive-right-tools {
            transform: scale(0.8);
            transform-origin: right;
          }
        }
        @media (max-width: 600px) {
          .responsive-logo {
            transform: scale(0.6);
            transform-origin: left;
          }
          .responsive-patient {
            transform: translateY(-50%) scale(0.6);
            right: 4px;
            transform-origin: right;
          }
          .responsive-left-tools {
            transform: scale(0.7);
            transform-origin: left;
          }
          .responsive-right-tools {
            transform: scale(0.7);
            transform-origin: right;
          }
        }
        .toolbar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .toolbar-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
      <style>{`
  .responsive-patient {
    transform: translateY(-50%);
    position: absolute;
    right: 4px;
  }
  .responsive-right-tools {
    transform: scale(1);
  }
  .responsive-left-tools {
    transform: scale(1);
    transform-origin: left;
  }

  /* Mobile toolbar icons */
  @media (max-width: 768px) {
    .responsive-left-tools {
      transform: scale(1) !important;
    }
    .responsive-right-tools {
      transform: scale(1) !important;
    }
    .responsive-left-tools button {
      width: 40px !important;
      height: 40px !important;
      min-width: 40px !important;
      min-height: 40px !important;
    }
    .responsive-left-tools button svg {
      width: 24px !important;
      height: 24px !important;
    }
    .responsive-right-tools button {
      width: 40px !important;
      height: 40px !important;
    }
    .responsive-right-tools button svg {
      width: 24px !important;
      height: 24px !important;
    }
  }

  @media (max-width: 1200px) {
    .responsive-logo {
      transform: scale(0.85);
      transform-origin: left;
    }
    .responsive-patient {
      transform: translateY(-50%) scale(0.85);
      right: 4px;
      transform-origin: right;
    }
  }
  @media (max-width: 900px) {
    .responsive-logo {
      transform: scale(0.7);
      transform-origin: left;
    }
    .responsive-patient {
      transform: translateY(-50%) scale(0.7);
      right: 4px;
      transform-origin: right;
    }
  }
  @media (max-width: 600px) {
    .responsive-logo {
      transform: scale(0.6);
      transform-origin: left;
    }
    .responsive-patient {
      transform: translateY(-50%) scale(0.6);
      right: 4px;
      transform-origin: right;
    }
  }
  .toolbar-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .toolbar-scroll::-webkit-scrollbar {
    display: none;
  }
`}</style>
      <div className="flex flex-col">
        <NavBar
          isSticky={isSticky}
          {...props}
        >
          <div className="relative h-[48px] items-center">
            <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
              <div
                className={classNames(
                  'mr-2 inline-flex items-center',
                  isReturnEnabled && 'cursor-pointer'
                )}
                data-cy="return-to-work-list"
              >
                {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
                <div className="ml-1 responsive-logo">
                  {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
                </div>
              </div>
            </div>

            <div className="top-1/2 responsive-patient">
              {PatientInfo}
            </div>
          </div>
        </NavBar>

        <div className="bg-black border-t border-gray-800 relative h-[38px]">
          <div
            ref={toolbarScrollRef}
            className="absolute left-0 right-0 top-0 bottom-0 overflow-x-auto overflow-y-hidden toolbar-scroll flex items-center"
          >
            {/* <div
  ref={toolsContainerRef}
  className={classNames(
    'flex items-center whitespace-nowrap h-full',
    isMobile ? 'gap-1 pl-1 pr-1' : 'gap-2',
    shouldCenter && !isMobile ? 'mx-auto' : 'pl-2 pr-2'
  )}
>
              {Secondary}
              {children}
            </div> */}
            <div
  ref={toolsContainerRef}
  className={classNames(
    'flex items-center whitespace-nowrap h-full',
    isMobile ? 'gap-1 pl-1 pr-1' : 'gap-2',
    shouldCenter && !isMobile ? 'mx-auto' : 'pl-2 pr-2'
  )}
>
  {Secondary}
  {children}
  <div style={{ width: '180px', minWidth: '180px', height: '1px' }}></div>
</div>
          </div>

          <div
            ref={rightButtonsRef}
            className="absolute right-1 top-0 h-full flex items-center gap-2 responsive-right-tools bg-black pl-4 pointer-events-auto z-10"
          >
            {UndoRedo}
            <div className="border-primary-dark mx-1.5 h-[20px] border-r"></div>
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-primary-dark flex items-center justify-center"
                  >
                    <Icons.GearSettings />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {menuOptions.map((option, index) => {
                    const IconComponent = option.icon
                      ? Icons[option.icon as keyof typeof Icons]
                      : null;
                    return (
                      <DropdownMenuItem
                        key={index}
                        onSelect={option.onClick}
                        className="flex items-center gap-2 py-2"
                      >
                        {IconComponent && (
                          <span className="flex h-4 w-4 items-center justify-center">
                            <Icons.ByName name={option.icon} />
                          </span>
                        )}
                        <span className="flex-1">{option.title}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </IconPresentationProvider>
  );
}

export default Header;
