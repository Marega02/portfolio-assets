export const runtime="edge";
export async function GET(){
 return Response.json({
  configured:Boolean(process.env.GOOGLE_CLIENT_ID&&process.env.GITHUB_TOKEN&&process.env.ADMIN_EMAIL),
  clientId:process.env.GOOGLE_CLIENT_ID||"",
  destinations:[
   {value:"rodica",label:"Mountains / Rodica"},
   {value:"krn",label:"Mountains / Krn"},
   {value:"kucelj",label:"Mountains / Kucelj"},
   {value:"kobilja-glava",label:"Mountains / Kobilja Glava"},
   {value:"monte-talm",label:"Mountains / Monte Talm"},
   {value:"london",label:"London"},
   {value:"malaysia",label:"Malaysia"},
   {value:"singapore",label:"Singapore"},
   {value:"bali",label:"Bali"},
   {value:"amsterdam",label:"Amsterdam"}
  ]
 },{headers:{"Cache-Control":"no-store"}});
}
