import { useEffect, useState } from 'react'
import './App.css'
import { TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@mui/material'
import Fuse from 'fuse.js'
import questions from './questions.json'
import { v4 as uuid4 } from 'uuid'

const FUSE_OPTIONS = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	// threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		"q"
	]
};

function App() {
  const [input, setInput] = useState("")
  const [options, setOptions] = useState([])
  const fuse = new Fuse(questions, FUSE_OPTIONS)

  useEffect(() => {
    setOptions(fuse.search(input))
  }, [input])

  return (
    <>
      <TextField value={input} onChange={e => setInput(e.target.value)} color='info' sx={{input: { color: 'white' }}}/>
      <TableContainer component={Paper} sx={{marginTop: 10}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map((option) => (
            <TableRow
              key={option.refIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {option.item.q}
              </TableCell>
              <TableCell  align="right">{option.item.a}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default App
