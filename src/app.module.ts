import { Module } from '@nestjs/common';
import { AppController } from './_Test/app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsQueryRepo } from './modules/blogs/infrastructure/blogs.queryRepo';
import { BlogsRepository } from './modules/blogs/infrastructure/blogs.repository';
import { DeleteBlogUseCase } from './modules/blogs/application/use-cases/delete-blog-use-case';
import { BlogsController } from './modules/blogs/api/blogs.controller';
import { PostsQueryRepo } from './modules/posts/infrastructure/posts.queryRepo';
import { PostsRepository } from './modules/posts/infrastructure/posts.repository';
import { LikePostUseCase } from './modules/posts/application/use-cases/like-post-use-case';
import { PostsController } from './modules/posts/api/posts.controller';
import { CommentLike, CommentLikeSchema } from './modules/comments/domain/commentLike.schema';
import { Comment, CommentSchema } from './modules/comments/domain/comment.schema';
import { CommentsQueryRepo } from './modules/comments/infrastructure/comments.queryRepo';
import { CommentsRepository } from './modules/comments/infrastructure/comments.repository';
import { CommentsController } from './modules/comments/api/comments.controller';
import { UsersQueryRepo } from './modules/users/infrastructure/users.queryRepo';
import { UsersRepository } from './modules/users/infrastructure/users.repository';
import { CreateUserUseCase } from './modules/users/application/use-cases/create-user-use-case';
import { UsersControllerSA } from './modules/users/api/sa.users.controller';
import { DeleteAllController } from './modules/delete_all/delete-all.controller';
import { AttemptsService } from './modules/auth/application/attempts.service';
import { AttemptsRepository } from './modules/auth/infrastructure/attempts.repository';
import { AuthService } from './modules/auth/application/auth.service';
import { EmailService } from './modules/auth/application/email.service';
import { ApiJwtService } from './modules/auth/application/api-jwt.service';
import { PasswordRecoveryRepository } from './modules/auth/infrastructure/password-recovery.repository';
import { AuthController } from './modules/auth/api/auth.controller';
import { DeleteSessionsExceptCurrentUseCase } from './modules/security/application/use-cases/delete-sessions-except-current-use-case';
import { SecurityRepository } from './modules/security/infrastructure/security.repository';
import { SecurityQueryRepo } from './modules/security/infrastructure/security.queryRepo';
import { SecurityController } from './modules/security/api/security.controller';
import { JwtModule } from '@nestjs/jwt';
import { IsBlogExistConstraint } from './main/decorators/is-blog-exist.decorator';
import { IsFreeLoginOrEmailConstraint } from './main/decorators/is-free-login-or-email.decorator';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailAdapter } from './modules/auth/infrastructure/email.adapter';
import { ApiConfigService } from './main/configuration/api.config.service';
import { ApiConfigModule } from './main/configuration/api.config.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './main/configuration/configuration';
import Joi from 'joi';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './modules/auth/api/strategies/local.strategy';
import { JwtStrategy } from './modules/auth/api/strategies/jwt.strategy';
import { BasicStrategy } from './modules/auth/api/strategies/basic.strategy';
import { CreateBlogUseCase } from './modules/blogs/application/use-cases/create-blog-use-case';
import { UpdateBlogUseCase } from './modules/blogs/application/use-cases/update-blog-use-case';
import { DeleteAllUseCase } from './modules/delete_all/delete-all-use-case';
import { CreatePostUseCase } from './modules/posts/application/use-cases/create-post-use-case';
import { UpdatePostUseCase } from './modules/posts/application/use-cases/update-post-use-case';
import { DeletePostUseCase } from './modules/posts/application/use-cases/delete-post-use-case';
import { CreateCommentUseCase } from './modules/comments/application/use-cases/create-comment-use-case';
import { UpdateCommentUseCase } from './modules/comments/application/use-cases/update-comment-use-case';
import { LikeCommentUseCase } from './modules/comments/application/use-cases/like-comment-use-case';
import { DeleteCommentUseCase } from './modules/comments/application/use-cases/delete-comment-use-case';
import { DeleteUserUseCase } from './modules/users/application/use-cases/delete-user-use-case';
import { ChangePasswordUseCase } from './modules/auth/application/use-cases/change-password-use-case';
import { ConfirmEmailUseCase } from './modules/auth/application/use-cases/confirm-email-use-case';
import { LoginUserUseCase } from './modules/auth/application/use-cases/login-user-use-case';
import { DeleteSessionUseCase } from './modules/security/application/use-cases/delete-session-use-case';
import { RegisterUserUseCase } from './modules/auth/application/use-cases/register-user-use-case';
import { ResendRegistrationEmailUseCase } from './modules/auth/application/use-cases/resend-registration-email-use-case';
import { SendPasswordRecoveryEmailUseCase } from './modules/auth/application/use-cases/send-password-recovery-email-use-case';
import { GenerateNewTokensUseCase } from './modules/auth/application/use-cases/generate-new-tokens-use-case';
import { SecurityService } from './modules/security/application/security.service';
import { CqrsModule } from '@nestjs/cqrs';
import { BanUserUseCase } from './modules/users/application/use-cases/ban-user-use-case';
import { BlogsControllerBl } from './modules/blogs/api/blogger.blogs.controller';
import { BlogsControllerSA } from './modules/blogs/api/sa.blogs.controller';
import { BindBlogWithUserUseCase } from './modules/blogs/application/use-cases/bind-blog-with-user-use-case';
import { CommentsService } from './modules/comments/application/comments.service';
import { PostsService } from './modules/posts/application/posts.service';
import { BanBlogUseCase } from './modules/blogs/application/use-cases/ban-blog-use-case';
import { BanUserForBlogByBloggerUseCase } from './modules/users/application/use-cases/ban-user-for-blog-by-blogger-use-case';
import { UsersControllerBl } from './modules/users/api/blogger.users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

const useCases = [
  DeleteAllUseCase,
  CreateBlogUseCase,
  UpdateBlogUseCase,
  DeleteBlogUseCase,
  CreatePostUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
  LikePostUseCase,
  CreateCommentUseCase,
  UpdateCommentUseCase,
  LikeCommentUseCase,
  DeleteCommentUseCase,
  CreateUserUseCase,
  DeleteUserUseCase,
  ChangePasswordUseCase,
  ConfirmEmailUseCase,
  RegisterUserUseCase,
  ResendRegistrationEmailUseCase,
  SendPasswordRecoveryEmailUseCase,
  LoginUserUseCase,
  DeleteSessionUseCase,
  DeleteSessionsExceptCurrentUseCase,
  GenerateNewTokensUseCase,
  BanUserUseCase,
  BindBlogWithUserUseCase,
  BanBlogUseCase,
  BanUserForBlogByBloggerUseCase,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],

      validationSchema: Joi.object({
        //NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
        PORT: Joi.number(),

        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),

        JWT_SECRET_FOR_ACCESSTOKEN: Joi.string().required(),
        EXPIRES_IN_TIME_OF_ACCESSTOKEN: Joi.string().required(),
        JWT_SECRET_FOR_REFRESHTOKEN: Joi.string().required(),
        EXPIRES_IN_TIME_OF_REFRESHTOKEN: Joi.string().required(),

        SA_LOGIN: Joi.string().required(),
        SA_PASSWORD: Joi.string().required(),

        EMAIL_PASSWORD: Joi.string().required(),
        EMAIL: Joi.string().email().required(),
        EMAIL_FROM: Joi.string().required(),
        MY_EMAIL: Joi.string().email().required(),

        IP_RESTRICTION: Joi.boolean(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => {
        return {
          type: 'postgres',
          host: apiConfigService.TYPEORM_HOST,
          port: apiConfigService.TYPEORM_PORT,
          username: apiConfigService.TYPEORM_USERNAME,
          password: apiConfigService.TYPEORM_PASSWORD,
          database: apiConfigService.TYPEORM_DATABASE,
          entities: [],
          synchronize: false,
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => {
        const uri = apiConfigService.MONGO_URI;
        const dbName = apiConfigService.MONGO_DATABASE;
        return { uri, dbName };
      },
    }),
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: CommentLike.name, schema: CommentLikeSchema },
    ]),
    MailerModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => {
        const user = apiConfigService.EMAIL;
        const pass = apiConfigService.EMAIL_PASSWORD;
        const sender = apiConfigService.EMAIL_FROM;
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user, pass },
          },
          defaults: {
            from: `${sender} <${user}>`,
          },
          template: {
            dir: __dirname + '/modules/auth/application/templates/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => {
        return {
          secret: apiConfigService.JWT_SECRET_FOR_ACCESSTOKEN,
          signOptions: { expiresIn: apiConfigService.EXPIRES_IN_TIME_OF_ACCESSTOKEN },
        };
      },
    }),
    CqrsModule,
  ],
  controllers: [
    AppController,
    BlogsController,
    BlogsControllerBl,
    BlogsControllerSA,
    PostsController,
    CommentsController,
    UsersControllerSA,
    UsersControllerBl,
    DeleteAllController,
    AuthController,
    SecurityController,
  ],
  providers: [
    BasicStrategy,
    LocalStrategy,
    JwtStrategy,
    IsBlogExistConstraint,
    IsFreeLoginOrEmailConstraint,
    BlogsQueryRepo,
    BlogsRepository,
    PostsService,
    PostsQueryRepo,
    PostsRepository,
    CommentsService,
    CommentsQueryRepo,
    CommentsRepository,
    UsersQueryRepo,
    UsersRepository,
    AttemptsRepository,
    AuthService,
    ApiJwtService,
    EmailService,
    EmailAdapter,
    PasswordRecoveryRepository,
    SecurityRepository,
    SecurityQueryRepo,
    SecurityService,
    ApiConfigService,
    AttemptsService,
    ...useCases,
  ],
})
export class AppModule {}
