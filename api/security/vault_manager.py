#!/usr/bin/env python3
"""
Auto-Notion Institutional Vault Manager
AES-256-GCM Encryption for secure credential storage
"""

import os
import base64
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
import logging

class InstitutionalVault:
    """
    Secure credential vault for Auto-Notion platform.
    Ensures zero-trust token management.
    """
    
    def __init__(self, master_password: str = None):
        self.logger = logging.getLogger(__name__)
        self.salt = b'LAKHAN-BHAI-DAO-SALT' # In production, this would be stored separately
        
        password = master_password or os.getenv("VAULT_MASTER_KEY", "DEFAULT_INSTITUTIONAL_KEY")
        self.key = self._derive_key(password)
        self.aesgcm = AESGCM(self.key)

    def _derive_key(self, password: str) -> bytes:
        """Derive AES key from master password"""
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=self.salt,
            iterations=100000,
        )
        return kdf.derive(password.encode())

    def encrypt(self, plaintext: str) -> str:
        """Encrypt string data"""
        nonce = os.urandom(12)
        ciphertext = self.aesgcm.encrypt(nonce, plaintext.encode(), None)
        return base64.b64encode(nonce + ciphertext).decode()

    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt string data"""
        data = base64.b64decode(encrypted_data)
        nonce = data[:12]
        ciphertext = data[12:]
        return self.aesgcm.decrypt(nonce, ciphertext, None).decode()

    def store_token(self, name: str, token: str):
        """Securely store a token in the vault file"""
        encrypted = self.encrypt(token)
        vault_path = ".vault/institutional.vault"
        os.makedirs(".vault", exist_ok=True)
        
        vault = {}
        if os.path.exists(vault_path):
            with open(vault_path, "r") as f:
                try:
                    vault = json.load(f)
                except:
                    pass
        
        vault[name] = encrypted
        with open(vault_path, "w") as f:
            import json
            json.dump(vault, f, indent=2)
            
    def get_token(self, name: str) -> str:
        """Retrieve and decrypt a token"""
        vault_path = ".vault/institutional.vault"
        if not os.path.exists(vault_path):
            return None
            
        with open(vault_path, "r") as f:
            import json
            vault = json.load(f)
            
        encrypted = vault.get(name)
        if encrypted:
            return self.decrypt(encrypted)
        return None

if __name__ == "__main__":
    vault = InstitutionalVault("lakhan-bhai-2024")
    token = "EAAb689310950781431..."
    encrypted = vault.encrypt(token)
    print(f"Encrypted: {encrypted}")
    print(f"Decrypted: {vault.decrypt(encrypted)}")
    
    # Test storage
    vault.store_token("META_APP_SECRET", "689310950781431_secret")
    print(f"Retrieved: {vault.get_token('META_APP_SECRET')}")
