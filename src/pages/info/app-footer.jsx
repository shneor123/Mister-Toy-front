import { useLocation } from "react-router-dom"

export const AppFooter = () => {
  const { pathname } = useLocation()
  let routeClass
  if (pathname === "/" || pathname === "/about" || pathname === "/login" || pathname === "/signup" || pathname === "/users" || pathname === "/reviews")
    routeClass = "-home"
  return (
    <section>
      {pathname !== "/toy" && (
        <div className={`${routeClass}`}>
          &copy;  All rights not reserved
        </div>
      )}
      {pathname === "/toy" && <div className={`footer${pathname}`}>&copy;  All rights not reserved</div>}

    </section>
  )
}