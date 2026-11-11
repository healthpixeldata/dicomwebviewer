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
  Secondary?: ReactNode;
  /** Items shown at the right of the top row (patient info). */
  RightSide?: ReactNode[];
  /** Items shown at the right of the toolbar row, before the settings menu (undo/redo). */
  ToolbarRight?: ReactNode[];
}

function Header({
  children,
  menuOptions,
  isReturnEnabled = true,
  onClickReturnButton,
  isSticky = false,
  WhiteLabeling,
  RightSide = [],
  ToolbarRight = [],
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
  }, [children, Secondary, ToolbarRight]);

  const shouldCenter = !isMobile && toolsWidth < toolbarWidth;

  return (
    <IconPresentationProvider
      size="large"
      IconContainer={ToolButton}
    >

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
                onClick={onClickReturn}
                data-cy="return-to-work-list"
              >
                {isReturnEnabled && <Icons.ArrowLeft className="text-primary ml-1 h-7 w-7" />}
                <div className="ml-1 responsive-logo">
                  {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.InnowaveLogo />}
                </div>
              </div>
            </div>

            <div className="top-1/2 responsive-patient">
              <div className="flex items-center">
                {RightSide.map((item, index) => (
                  <div key={index} className="flex items-center empty:hidden">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </NavBar>

        <div className="bg-black border-t border-gray-800 relative h-[38px]">
          <div
            ref={toolbarScrollRef}
            className="absolute left-0 right-0 top-0 bottom-0 overflow-x-auto overflow-y-hidden toolbar-scroll flex items-center"
          >

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
            {ToolbarRight.map((item, index) => (
              <div key={index} className="flex items-center empty:hidden">
                {item}
              </div>
            ))}
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
