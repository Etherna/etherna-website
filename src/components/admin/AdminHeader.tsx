const AdminHeader: React.FC = () => {
  return (
    <header className="mt-6 mb-20 flex flex-wrap items-center">
      <div className="flex w-full justify-around py-8 md:order-2 md:w-auto md:flex-1">
        <a href="/">
          <img src={require("@/assets/logo.svg").default} alt="Etherna" />
        </a>
      </div>
      <div className="flex w-1/2 text-sm font-semibold md:order-1 md:w-1/3">
        <a href="/" className="mr-auto">
          ← Back to Etherna
        </a>
      </div>
      <div className="flex w-1/2 text-sm font-semibold md:order-3 md:w-1/3">
        <a
          href={import.meta.env.DIRECTUS_URL}
          className="btn btn-primary ml-auto"
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
