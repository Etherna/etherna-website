import classes from "@styles/components/admin/AdminHeader.module.scss"

const AdminHeader: React.FC = () => {
  return (
    <header className={classes.adminHeader}>
      <div className={classes.adminHeaderLogo}>
        <Link to="/">
          <img src={require("@images/logo.svg").default} alt="Etherna" />
        </Link>
      </div>
      <div className={classes.adminHeaderHome}>
        <Link to="/">← Back to Etherna</Link>
      </div>
      <div className={classes.adminHeaderBackend}>
        <a
          href={import.meta.env.DIRECTUS_URL}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Backend →
        </a>
      </div>
    </header>
  )
}

export default AdminHeader
