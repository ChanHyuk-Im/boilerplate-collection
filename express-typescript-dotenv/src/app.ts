import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import morgan from 'morgan';
import config from './config';
import indexRouter from './routes/index';

const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
		success: false
	});
});

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
