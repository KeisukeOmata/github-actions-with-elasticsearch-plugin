import { NextPage } from 'next'
import { Api } from '../types/api'

type Props = {
  children: Api;
};

const Page: NextPage<Props> = ({ children }) => {
  return (
    <>
      {children.title}
    </>
  )
}

export default Page
