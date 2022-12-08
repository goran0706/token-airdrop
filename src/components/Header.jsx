import { Group } from '@mantine/core';
import ProjectLogo from '../assets/svg/token-logo.svg';
import Logo from './Logo';
import NetworkDropdown from './NetworkDropdown';
import networks from '../config/networks.json';
import ButtonToggler from './ThemeToggler';
import WalletConnect from './WalletConnect';

const Header = () => {
    return (
        <Group noWrap position='apart'>
            <Logo href='/' src={ProjectLogo} alt='Project Logo' label='Token Airdrop' />
            <Group>
                <ButtonToggler />
                <NetworkDropdown networkLabel='Network List' networkList={networks} />
                <WalletConnect />
            </Group>
        </Group>
    );
};

export default Header;
