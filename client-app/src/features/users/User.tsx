
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const User: React.FC = () => {
  const { keycloak } = useKeycloak();

  return (
    <div>
      {keycloak.authenticated && (
        <div className="flex items-center">
          <span className="text-white mr-4">Hello, {keycloak.tokenParsed?.preferred_username}</span>
          <button
            onClick={() => keycloak.logout()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
