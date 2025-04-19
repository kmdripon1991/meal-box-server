import { NextFunction, Request, Response, Router } from 'express';
import { mealProviderController } from './meal.provider.controller';
// import auth from '../../middlewares/auth';
// import { upload } from '../../utils/uploadImageCloudinary';
import auth from '../../utils/auth';
// import { USER_ROLE } from '../User/user.constant';
// import ValidateRequest from '../../middlewares/validateRequest';
// import { mealProviderValidation } from './meal.provider.validaction';
import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from '../User/user.constant';
const router = Router();

router.post(
  '/create-mealProvider',
  auth('customer'),
  //   ValidateRequest(mealProviderValidation.MealProviderSchema),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  //   auth(UserRole.user),
  mealProviderController.createMealProvider,
);
router.get('/', mealProviderController.getAllMealProvider);
router.get(
  '/my-meal-provider',
  auth('mealProvider'),
  mealProviderController.getMyMealProvider,
);
router.put(
  '/update-mealProvider',
  auth('mealProvider'),
  //   ValidateRequest(mealProviderValidation.MealProviderSchema),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  //   auth(UserRole.user),
  mealProviderController.updateMealProvider,
);
// router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);

export const mealProviderRouter = router;
