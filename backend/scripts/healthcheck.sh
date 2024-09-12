for i in {1..10}; do
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)
echo "Attempt $i: Response Code $response"

if [ "$i" -eq 10 ] && [ "$response" -ne 200 ]; then
echo "Health check failed after 10 attempts."
exit 1
fi

sleep 10
done
echo "Health check passed."
