import { useEffect, useState } from "react";
import "./App.css";
import {
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Fuse from "fuse.js";

import questions from "./questions.json";

const FUSE_OPTIONS = {
  keys: ["q"],
};

/**
 * @typedef {Object} Option
 * @property {{q: string, a: string}} item
 * @property {number} refIndex
 */
const fuse = new Fuse(questions, FUSE_OPTIONS);
function App() {
  /** @type {string} */
  const [input, setInput] = useState("");

  /**
   * @type {[Option[], React.Dispatch<React.SetStateAction<Option[]>>]} state
   * */
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(fuse.search(input));
  }, [input]);

  return (
    <>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        color="info"
        sx={{ input: { color: "white" } }}
      />
      <TableContainer component={Paper} sx={{ marginTop: 10 }}>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {option.item.q}
                </TableCell>
                <TableCell align="right">{option.item.a}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
