{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [
    tailwindcss
  ];

  shellHook = ''
    tailwindcss -i styles/owo.css -o styles/uwu.css --watch
  '';
}
