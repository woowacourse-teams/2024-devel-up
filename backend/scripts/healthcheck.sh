for i in {1..5}; do
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)
echo "Attempt $i: Response Code $response"

if [ "$i" -eq 5 ] && [ "$response" -ne 200 ]; then
echo "Health check failed after 10 attempts."
exit 1
fi

sleep 5
done
echo "Health check passed."
