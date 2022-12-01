import { useEffect } from 'react'
import Link from 'next/link'
import Chat from '../components/chat/Chat'
import { GET_MESSAGES_SERVER, GET_MESSAGE } from '../api/messageApi'
import { addMessages, addNewMessage } from '../store/message'
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from "react-redux"
import { useQuery, useSubscription } from '@apollo/client'
import { SUBSCRIBE_MESSAGE } from '../api/messageApi'
import { useRouter } from "next/router"
import { user, resetUser, addUser } from '../store/user'
import { createStructuredSelector } from 'reselect';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import styles from '../styles/Home.module.css'

function Home({serverMessages, addMessages, addNewMessage, user, resetUser, addUser}) {
  const [cookies, removeCookie, setCookies] = useCookies(['user']);
  const { data: newMessage } = useSubscription(SUBSCRIBE_MESSAGE)
  const { data, loading, refetch } = useQuery(GET_MESSAGE)
  const router = useRouter()

  const removeUser = () => {
    resetUser()
    removeCookie("user")
  }

  useEffect(() => {
    if(!cookies?.user) {
      router.push("/login")
    } else {
      addUser(cookies?.user)
    }
  }, [])

  useEffect(() => {
    if(serverMessages) {
      addMessages(serverMessages)
    } else {
      refetch()
      addMessages(data?.getMessages)
    }
  },[serverMessages, data])

  useEffect(() => {
    if(newMessage) {
      addNewMessage(newMessage?.messageCreator)
    }
  }, [newMessage])

  if(loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div className={styles.container}>
      <Chat/>
      <Link href={"/login"} as={"/login"}>Error</Link>
      <Button 
        variant='primary'
        onClick={removeUser}
      >
        Exit
      </Button>
    </div>
  )
}


Home.getInitialProps = async ({req}) => {
  if(!req) {
    return {
      serverMessages: null
    }
  }

  const response = await fetch(process.env.BASE_URL, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({query: GET_MESSAGES_SERVER})
    })
    const serverPosts = await response.json();
    const serverMessages = await serverPosts?.data?.getMessages
    return {
        serverMessages
    }
}

const mapStateToProps = createStructuredSelector({
  user
})

const mapDispatchToProps = dispatch => ({
  addMessages: bindActionCreators(addMessages, dispatch),
  addNewMessage: bindActionCreators(addNewMessage, dispatch),
  resetUser: bindActionCreators(resetUser, dispatch),
  addUser: bindActionCreators(addUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);