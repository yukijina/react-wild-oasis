import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--grey-100);
  /* grid behavior, move the sidebar to the first column (fixed). If we want to be set in the second column, maybe the grid-column would be added. 
    **If a multi-row item hits a roadblock where it doesn't fit on the current line, the browser pushes it to the beginning of the next row (Column 1) where it knows it has a clean slate of empty, unallocated rows ahead. */
  grid-row: 1 / -1;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
