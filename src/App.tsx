import { useState } from 'react'
import './App.scss'
// import dayjs from 'dayjs'
// import Table, { TableProps } from './components/Table'
import Flex from './components/Flex'
import Rate from './components/Rate'
import { Button } from './components'

// type GenreType = 'Fantasy' | 'Fiction' | 'Self-help' | 'Sappy' | 'Sci-fi'

// interface Title {
//   date: string
//   title: string
//   author: string
//   genre: Array<GenreType>
//   progress: number
//   rating: number
//   url: string
// }

// const colors: Record<GenreType, `#${string}`> = {
//   Fantasy: '#FBE7E9',
//   Fiction: '#EDE7FB',
//   'Self-help': '#D4F8D3',
//   Sappy: '#FFF0BB',
//   'Sci-fi': '#FBE7E9'
// }

const App = () => {
  // const props: TableProps<Title> = {
  //   headers: [
  //     {
  //       width: 200,
  //       fieldName: 'Date',
  //       fieldProp: 'date',
  //       render: (value) => dayjs(value).format('DD/MM/YYYY')
  //     },
  //     {
  //       fieldName: 'Title',
  //       fieldProp: 'title'
  //     },
  //     {
  //       fieldName: 'Author',
  //       fieldProp: 'author'
  //     },
  //     {
  //       fieldName: 'genre',
  //       fieldProp: 'genre',
  //       render: (value) => (
  //         <div className="flex align-center" style={{ gap: '10px' }}>
  //           {value.map((v, i) => (
  //             <div
  //               key={i}
  //               className="flex align-center"
  //               style={{ gap: '10px' }}
  //             >
  //               <div
  //                 style={{
  //                   backgroundColor: `${colors[v]}`,
  //                   padding: '4px 12px',
  //                   borderRadius: '6px'
  //                 }}
  //               >
  //                 {v}
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )
  //     },
  //     {
  //       fieldName: 'Rating',
  //       fieldProp: 'rating'
  //     },
  //     {
  //       fieldName: 'URL',
  //       fieldProp: 'url',
  //       render: (value) => <a href={value}>{value}</a>
  //     }
  //   ],
  //   data: [
  //     {
  //       date: String(new Date().getTime()),
  //       title: 'Fire&Blood',
  //       author: 'J.R.R. Tolkien',
  //       genre: ['Fantasy', 'Fiction'],
  //       progress: 80,
  //       rating: 4.8,
  //       url: 'https://example.com/lotr'
  //     },
  //     {
  //       date: String(new Date().getTime() - 1000 * 60 * 60 * 24),
  //       title: 'Bridge of clay',
  //       author: 'Harper Lee',
  //       genre: ['Fiction'],
  //       progress: 50,
  //       rating: 4.5,
  //       url: 'https://example.com/mockingbird'
  //     },
  //     {
  //       date: String(new Date().getTime() - 1000 * 60 * 60 * 24 * 2),
  //       title: 'Do Epic Shit',
  //       author: 'Stephen R. Covey',
  //       genre: ['Self-help'],
  //       progress: 30,
  //       rating: 4.2,
  //       url: 'https://example.com/7habits'
  //     },
  //     {
  //       date: String(new Date().getTime() - 1000 * 60 * 60 * 24 * 3),
  //       title: "My Sister's Keeper",
  //       author: 'Jojo Moyes',
  //       genre: ['Sappy'],
  //       progress: 20,
  //       rating: 4.0,
  //       url: 'https://example.com/mebeforeyou'
  //     },
  //     {
  //       date: String(new Date().getTime() - 1000 * 60 * 60 * 24 * 4),
  //       title: 'Atomic Habits',
  //       author: 'Douglas Adams',
  //       genre: ['Sci-fi'],
  //       progress: 90,
  //       rating: 4.7,
  //       url: 'https://example.com/hitchhiker'
  //     }
  //   ]
  // }
  const [state, setState] = useState(3)
  return (
    // <>
    //   <Flex align="center" justify="center" style={{ height: '100vh' }}>
    //     <Table
    //       {...props}
    //       style={{
    //         width: '100%',
    //         boxSizing: 'border-box',
    //         maxWidth: '1280px',
    //         padding: '20px',
    //         borderColor: '#9747FF',
    //         borderStyle: 'dashed'
    //       }}
    //     />
    //   </Flex>
    // </>
    <Flex gap={20} align="center">
      <Rate character="A" allowHalf value={state} onChange={setState} />
      <Button onClick={() => setState(4)}>click</Button>
    </Flex>
  )
}

export default App
