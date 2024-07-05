import { useState, useEffect } from "react"
import provider from "./ethers"
import { ethers } from "ethers"
const App = () => {
  const [account, setAccount] = useState<string>('')
  const [balance, setBalance] = useState<string>('')

  useEffect(() => {
    const getAccount = async() => {
      try {
        const accounts = await provider.listAccounts()
        console.log(accounts)
        const balance = await provider.getBalance(accounts[0])
        setBalance(ethers.formatEther(balance))
      } catch (error) {
        console.log(error)
      }
    }
    getAccount()
  })
  return (
    <>
      <div>
        App
      </div>
    </>
  )
}

export default App