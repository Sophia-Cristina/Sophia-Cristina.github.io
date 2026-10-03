import { IOE_CreateInputInterface } from '/IOE/includes/IOEInput.js';

export function IOE_CreateEnvironment(Application) { return({ input: IOE_CreateInputInterface(), dependencies: Application.dependencies }); }
export function IOE_RunApplication(Application, Environment) { return(Application.run(Environment)); }