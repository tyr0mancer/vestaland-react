import React, {useState} from "react";
import {Accordion, AccordionSummary, Box, Button, TextField, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * TS Doc Info
 * @component ErrorScreen
 *
 * @param error Das Fehlerobjekt
 */
export function ErrorScreen({error}: any) {
  const [userComment, setUserComment] = useState('')
  const [formSent, setFormSent] = useState(false)

  const handleSubmit = () => {
    console.log(userComment)
    console.log(error)
    // @todo call bug tracker API
    setFormSent(true)
  }

  if (!formSent)
    return (<Box mt={2}>
      <Typography variant={'h2'}>
        Es ist ein Fehler aufgetreten:
      </Typography>

      <Typography variant={'h3'} mt={2}>
        "{error?.message}"
      </Typography>

      <Box mt={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant={'h5'}>
              Fehlerdetails
            </Typography>
          </AccordionSummary>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </Accordion>
      </Box>

      <Box mt={3}>
        <TextField
          label={'Fehlerbeschreibung (optional)'}
          value={userComment}
          onChange={e => setUserComment(e.target.value)}
          fullWidth
          multiline
        />

        <Button
          onClick={handleSubmit}
          variant={'contained'} color={'primary'}>Fehler melden</Button>
      </Box>
    </Box>)

  return (<Box mt={2}>
    <Typography variant={'h2'}>
      Vielen Dank für Ihr Feedback!
    </Typography>
  </Box>)

}
