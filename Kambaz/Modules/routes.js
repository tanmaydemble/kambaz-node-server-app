import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
    app.delete("/api/modules/:moduleId", async (req, res) => {
        try {
            const { moduleId } = req.params;
            const result = await modulesDao.deleteModule(moduleId);
            res.send(result);
        } catch (error) {
            res.status(400).send({
                error: error.message || "Delete operation failed"
            });
        }
    });

    app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status = await modulesDao.updateModule(moduleId, moduleUpdates);
        res.send(status);
    });

}
