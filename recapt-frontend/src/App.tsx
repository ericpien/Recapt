import {
  Box,
  Button,
  Heading,
  Image,
  Flex,
  List,
  ListItem,
  Link,
  ListIcon,
  Avatar,
  useColorMode,
  useColorModeValue,
  Switch,
  Text,
} from '@chakra-ui/react'
import recaptLogo from './assets/recapt.png'
import demo from './assets/demo.png'
import './App.css'
import { MdCheckCircle, MdArrowOutward } from "react-icons/md";


function App() {
  const { colorMode, toggleColorMode } = useColorMode()

  const handleToggle = () => {
    toggleColorMode();
  };

  const bg = useColorModeValue('white', 'gray.700')
  const color = useColorModeValue('gray.700', 'black.800')

  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <Flex direction='column' >
      <Flex justifyContent='center' >
        <Button mr='5'>
          <Link href='https://github.com/MeganSorenson/BCS-Hackathon-2023' isExternal>GitHub</Link>
        </Button>
        <Flex justifyContent='center' mr='5'>
          <Box boxSize='lg' className='contentBox'>
            <Image src={recaptLogo} />
          </Box>
        </Flex>
        <Text fontSize={{ base: 'sm', md: 'md' }}>Light/Dark Mode &nbsp; </Text>
        <Switch size='lg'  onChange={handleToggle}/>
      </Flex>
      

      <Box className='contentBox' mb='10' bg={bg}>
        <Heading fontSize={{ base: '3xl', md: '4xl' }} 
        bg={bg} 
        color={color} 
        fontWeight='bold' mb='5'
        border-radius='3rem'>
          Get YouTube summaries in seconds!
        </Heading>
        <Flex justifyContent='center' alignContent='center'>
          <Box boxSize='2xl' height='30rem'>
            <Image src={demo} />
          </Box>
        </Flex>
        <List spacing={5} justifyContent='start' mb='5' fontSize='lg'bg={bg}>
          <Heading fontSize='4xl' fontWeight='bold' mb='5' bg={bg} color={color}>
            Great for:
          </Heading>
          <ListItem fontSize={{ base: '3xl', md: '2xl' }} bg={bg} color={color}>
            <ListIcon as={MdCheckCircle} color='green' />
            Finding information for homework or research
          </ListItem>
          <ListItem fontSize={{ base: '3xl', md: '2xl' }} bg={bg} color={color}>
            <ListIcon as={MdCheckCircle} color='green' />
            People with visual or audio impairment
          </ListItem>
        </List>
        <Button colorScheme='blue' rightIcon={<MdArrowOutward />} mb='2rem'> Try now!</Button>
      </Box>

      <Box className='contentBox' bg={bg}>
        <Text fontSize={{ base: '3xl', md: '2xl' }}
          textAlign={'center'}
          mb='5'
          fontWeight='bold'
          bg={bg} color={color}
        >Testimonial
        </Text>
        <Flex mb='5'>
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            textAlign={'center'}
            maxW={'3xl'}
            mb='5'
            fontWeight='itatlic'
            as='i'
            bg={bg} color={color}
          >
            "recapt has been a game changer for me! As someone with hearing impairment, I don't need to listen to the whole video to find what i want. I can just enter my question into recapt, and it finds exactly what I need in just seconds!"
          </Text>
        </Flex>
        <Box textAlign={'center'}>
          <Avatar
            name='Burt Donaldson'
            src='https://bit.ly/dan-abramov'>
          </Avatar>
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight='bold' bg={bg} color={color}>Burt Donaldson</Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default App

