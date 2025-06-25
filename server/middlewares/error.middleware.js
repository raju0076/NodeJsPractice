
export const ErrorHandler=async(err,req,res,next)=>{
   try {
      console.log(err.stack)
      const status=err.status || 500
      res.status(status).json({
        error:{
            message:err.message || 'Internal Server Error',
            status,
        },
      })

   } catch (error) {
    
   }
}