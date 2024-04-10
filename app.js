import e from "express";

const app = e()
app.use(e.json)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('combined'))
app.use(
  cors({
    origin : "*"
  })
  )