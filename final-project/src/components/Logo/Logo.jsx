import { Image } from "@chakra-ui/react"
import LogoPng from "../../assets/images/LOGO.png"
import { publicNavLinks } from "../../common/constrants"

const Logo = ({ width = 90, handleClickNavLink = () => {} }) => {
  return (
    <Image
      cursor="pointer"
      onClick={() => handleClickNavLink(publicNavLinks.home)}
      width={width}
      src={LogoPng}
    />
  )
}

export default Logo
