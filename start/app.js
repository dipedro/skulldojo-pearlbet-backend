"use strict";

const glob = use("glob");
const { merge, uniq } = use("lodash");

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  "@adonisjs/framework/providers/AppProvider",
  "@adonisjs/framework/providers/ViewProvider",
  "@adonisjs/lucid/providers/LucidProvider",
  "@adonisjs/bodyparser/providers/BodyParserProvider",
  "@adonisjs/cors/providers/CorsProvider",
  "@adonisjs/shield/providers/ShieldProvider",
  "@adonisjs/session/providers/SessionProvider",
  "@adonisjs/auth/providers/AuthProvider",
  "adonis-swagger/providers/SwaggerProvider",
  "adonis-bundler/providers/BundlerProvider",
  "@adonisjs/validator/providers/ValidatorProvider",
  "@adonisjs/lucid-slugify/providers/SlugifyProvider",
  "adonis-scheduler/providers/SchedulerProvider",
  "@adonisjs/redis/providers/RedisProvider",
  "@adonisjs/drive/providers/DriveProvider",
  "@adonisjs/mail/providers/MailProvider",
  "@adonisjs/antl/providers/AntlProvider",
  "../../../../../app/Providers/RollbarProvider",
  "@adonisjs/websocket/providers/WsProvider",
  "adonisjs-queue/providers/QueueProvider",
  "adonisjs-queue/providers/JobProvider",
  "adonis-acl/providers/AclProvider",
  "lucid-mongo/providers/LucidMongoProvider"
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  "@adonisjs/lucid/providers/MigrationsProvider",
  "adonis-scheduler/providers/CommandsProvider",
  "adonisjs-queue/providers/JobCommandsProvider",
  "@adonisjs/vow/providers/VowProvider",
  "adonis-acl/providers/CommandsProvider",
  "lucid-mongo/providers/MigrationsProvider"
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Scheduler: "Adonis/Addons/Scheduler",
  Mail: "Adonis/Addons/Mail",
  Role: "Adonis/Acl/Role",
  Permission: "Adonis/Acl/Permission"
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/

const workerCommands = [];
glob.sync("app/Commands/Worker*.js").map(item => {
  const command = item.replace("app", "App").replace(".js", "");
  workerCommands.push(command);
});

const commands = uniq(merge(workerCommands, []));

const locales = {
  /*
   |--------------------------------------------------------------------------
   | Loader
   |--------------------------------------------------------------------------
   |
   | The loader to be used for loading locale strings. The inbuilt loaders
   | are `file` and `database`.
   |
   */
  loader: "file",

  /*
     |--------------------------------------------------------------------------
     | Locale
     |--------------------------------------------------------------------------
     |
     | The default locale to be used when unable to detect the user locale.
     | Or if user locale is not supported.
     |
     */
  locale: "en"
};

module.exports = { providers, aceProviders, aliases, commands, locales };
