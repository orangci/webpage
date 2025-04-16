{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
  ];

  shellHook = ''
    if [ -d "node_modules" ]; then
        npm run dev
    else
        echo "node_modules directory does not exist. Installing dependencies..."
        npm install
        npm run dev
    fi
  '';
}
