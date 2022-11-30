import styled from "styled-components";

export const NavbarWrapper = styled.div`
    background-color: rebeccapurple;
    padding: 0 20px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
        color: white;
        font-size: 34px;
        font-family: 'Cedarville Cursive', cursive;
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    img {
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    span {
        
    }
    .menu {
      display: flex;
      align-items: center;
    }
    .menu-links {
        color: white;
        font-size: 18px;
        text-decoration: none;
        margin-left: 35px;
    }
    .tools-menu {
      position: relative;
    }
    .dropdown {
        display: flex;
        flex-direction: column;
        position: absolute;
        box-sizing: border-box;
        box-shadow: 7px 5px 5px -3px rgba(92,92,92,0.4), 0px 5px 10px rgba(92,92,92,0.6), -7px 5px 5px -3px rgba(92,92,92,0.4);
        width: 150px;
        top: 30px;
        right: 5%;
    }
    .is-active {
       color: white;
       background-color: rebeccapurple;
    }
`;

export const Link = styled.div`
  padding: 10px 20px;
  color: black;
  background-color: white;
  cursor: pointer;
`;

export const SidebarWrapper = styled.div`
  background-color: #3d3c3c;
  position: fixed;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .is-active-sides {
    background-color: rgb(87, 90, 94);
  }
`;

export const SideBox = styled.div`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e1e1e1; 
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #474646;
    cursor: pointer;
`;

export const ClockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      color: #555;
      font-size: 32px;
      font-weight: 300;
      margin-bottom: 0;
    }    
    .display {
      font-family: 'Orbitron', sans-serif;
      font-size: 130px;
      color: #555;
      margin-bottom: 0;
      line-height: 1.5;
    }
    .day {
      font-family: 'Orbitron', sans-serif;
      font-size: 40px;
      color: #555;
    }
`;

export const AlarmWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    .title {
      color: #555;
      font-size: 32px;
      font-weight: 300;
      margin-bottom: 0;
    }    
    .display {
      font-family: 'Orbitron', sans-serif;
      font-size: 130px;
      color: #555;
      margin-bottom: 0;
      line-height: 1.5;
    }
    .day {
      font-family: 'Orbitron', sans-serif;
      font-size: 40px;
      color: #555;
    }
`;

export const AlarmTitleWrapper = styled.div`
    .btn-start {
      background-color: rebeccapurple!important;
      color: white!important;
    }
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
`;