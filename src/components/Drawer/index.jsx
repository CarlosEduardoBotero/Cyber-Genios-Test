import { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const DRAWER_WIDTH = '270px';

const DrawerWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99;

  .active {
    margin-bottom: -2px;
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const DrawerContainer = styled.div`
  position: fixed;
  left: 0;
  height: 100vh;
  width: ${DRAWER_WIDTH};
  background-color: #ffffff;
  border-radius: 0px 24px 24px 0px;
  padding: 40px 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  transform: translateX(0);
  transition: transform 250ms ease;
  z-index: 99;

  & > * {
    max-width: max-content;
  }

  &[class~='toggle-drawer'] {
    transform: translateX(-${DRAWER_WIDTH});
  }
`;

const BackgroundShadow = styled.div`
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  opacity: 1;
  transition: opacity 250ms ease;

  &[class~='fade'] {
    opacity: 0;
  }
`;

const NavLinkDrawerStyled = styled(NavLink)`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
`;

const Drawer = ({ setOpenModal }) => {
  const BackgroundRef = useRef();
  const DrawerContainerRef = useRef();

  const onClickFade = () => {
    BackgroundRef.current.classList.add('fade');
    DrawerContainerRef.current.classList.add('toggle-drawer');
    setTimeout(() => setOpenModal(false), 250);
  };

  useLayoutEffect(() => {
    document.body.style.overflowY = 'hidden';
    DrawerContainerRef.current.classList.add('toggle-drawer');
    BackgroundRef.current.classList.add('fade');

    setTimeout(() => {
      DrawerContainerRef.current.classList.remove('toggle-drawer');
      BackgroundRef.current.classList.remove('fade');
    }, 1);

    //Check if the scrollbar is visible
    if (document.body.clientHeight > window.innerHeight) {
      document.body.style.marginRight = '17px';
    }
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  return (
    <DrawerWrapper>
      <BackgroundShadow ref={BackgroundRef} onClick={onClickFade} />
      <DrawerContainer ref={DrawerContainerRef}>
        <Icon icon='carbon:logo-delicious' style={{ fontSize: '65px' }} />
        <NavLinkDrawerStyled
          className='p-font-size-md'
          to='/'
          onClick={onClickFade}
        >
          Home
        </NavLinkDrawerStyled>
        <NavLinkDrawerStyled
          className='p-font-size-md'
          to='/sobre'
          onClick={onClickFade}
        >
          Sobre
        </NavLinkDrawerStyled>
        <NavLinkDrawerStyled
          className='p-font-size-md'
          to='/tabela'
          onClick={onClickFade}
        >
          Tabela
        </NavLinkDrawerStyled>
        <NavLinkDrawerStyled
          className='p-font-size-md'
          to='/fale-conosco'
          onClick={onClickFade}
        >
          Fale conosco
        </NavLinkDrawerStyled>
      </DrawerContainer>
    </DrawerWrapper>
  );
};

export default Drawer;
