import { onRequestPost as __api_admin_get_lists_js_onRequestPost } from "C:\\z\\attention\\PaceLeader\\functions\\api\\admin\\get-lists.js"
import { onRequestPost as __api_admin_update_lists_js_onRequestPost } from "C:\\z\\attention\\PaceLeader\\functions\\api\\admin\\update-lists.js"
import { onRequestPost as __api_auth_verify_js_onRequestPost } from "C:\\z\\attention\\PaceLeader\\functions\\api\\auth\\verify.js"
import { onRequestPost as __api_pacer_runs_js_onRequestPost } from "C:\\z\\attention\\PaceLeader\\functions\\api\\pacer\\runs.js"

export const routes = [
    {
      routePath: "/api/admin/get-lists",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_get_lists_js_onRequestPost],
    },
  {
      routePath: "/api/admin/update-lists",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_update_lists_js_onRequestPost],
    },
  {
      routePath: "/api/auth/verify",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_verify_js_onRequestPost],
    },
  {
      routePath: "/api/pacer/runs",
      mountPath: "/api/pacer",
      method: "POST",
      middlewares: [],
      modules: [__api_pacer_runs_js_onRequestPost],
    },
  ]