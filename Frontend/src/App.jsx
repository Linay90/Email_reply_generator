import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, Menu, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const[emailConetent,setEmailContent]=useState('')
  const[tone,setTone]=useState('');
  const[generatedReply,setGeneratedReply]=useState('');
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState('');

  const handleSubmit=async()=>{
    setLoading(true)
    setError('');
    try{
      const response=await axios.post("http://localhost:8080/api/email/generate",{
        emailConetent,
        tone

      });
      setGeneratedReply(typeof response.data=='string'? response.data:JSON.stringify(response.data))


    }catch(error){
      setError('Fail to generate reply.Please try agin');
      console.error(error)

    }finally{
      setLoading(false)
    }



  }

  
  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component='h1' gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{mx:3}}>
        <TextField 
           fullWidth
           multiline
           rows={6}
           variant='outlined'
           label="Original Email Conetent"
           value={emailConetent || '' }
           onChange={(e)=>setEmailContent(e.target.value)}
            sx={{mb:2}}/>
            <FormControl fullWidth sx={{mb:2}} >
              <InputLabel>Tone(optional)</InputLabel>
              <Select value={tone || ''}
              label={"Tone(Optional)"}
                onChange={(e)=>setTone(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>
            <Button variant='contained'
            onClick={handleSubmit}
            disabed={!emailConetent || loading}
            fullWidth>

              {loading?<CircularProgress size={24}/> : "Generate Reply"}
            </Button>



      </Box>
      {error&&(
        <Typography color='error' sx={{mb:2}} >
        {error}
      </Typography>

      )}
      {generatedReply && (
        <Box sx={{mt:3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
            
          </Typography>
          <TextField
           fullWidth
           multiline
           rows={6}
           variant='outlined'
           value={generatedReply || ""}
           inputProps={{readOnly:true}}
           />
           <Button
             variant='outlined'
             sx={{mt:2}}
             onClick={()=>navigator.clipboard.writeText(generatedReply)}>
              Copy to clipboard

           </Button>
        </Box>
      )}
    
      
    </Container>
  )
}

export default App
