import { IOE_LoadDependencies } from '/IOE/includes/IOEDependencyLoader.js';

export async function IOE_LoadApplication(url)
{
    const Module = await import(url);

    if(!Module.IOE_Application) { throw new Error('IOE: Module does not provide IOE_Application.'); }
    const Application = Module.IOE_Application;
    if(!Application.header) { throw new Error('IOE: Application has no header.'); }

    if(!Application.header.dependencies) { Application.header.dependencies = []; }
    const Dependencies = await IOE_LoadDependencies(Application.header.dependencies);
    Application.dependencies = Dependencies;

    return(Application);
}