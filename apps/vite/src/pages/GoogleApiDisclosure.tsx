const GoogleApiDisclosure = () => {
  return (
    <div className="mx-3 my-3 dark:text-white lg:mx-auto lg:max-w-3xl">
      <h1 className="mt-10 text-center text-3xl font-bold">
        Google Api Disclosure
      </h1>
      <p className="mt-6">
        Miti’s use and transfer to any other app of information received from
        Google APIs will adhere to the{' '}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
          className="text-indigo-600"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
    </div>
  );
};

export default GoogleApiDisclosure;
