以下の設定を行ってください：
1. pnpmでpackage.jsonを作成
2. TypeScript、Vitest、@types/nodeを開発依存関係としてインストール
3. package.jsonに"type": "module"を追加
4. tsconfig.jsonを作成（target: ES2022、module: ESNext、moduleResolution: bundler、strict: true）
5. package.jsonのscriptsに"test": "vitest"を追加
