#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define blue1 vec3(0.74,0.95,1.00);
#define light_blue vec3(0.51,1.,1.);
#define dark_blue vec3(0.35,0.76,0.83)
#define PI 3.141592653589793238;

float circle(in vec2 st,in float radius){
    st-=0.5;
    float pct=1.-smoothstep(radius,radius,sqrt(dot(st,st)));
    return pct;
}

float _cross(in vec2 st,in float thickness){
    float pct=1.-step(smoothstep(st.x-thickness,st.x,st.y)-smoothstep(st.x,st.x+thickness,st.y),0.0);
    st=vec2(-st.x,st.y);
    pct+=1.-step(smoothstep(st.x-thickness,st.x,st.y)-smoothstep(st.x,st.x+thickness,st.y),0.0);
    return pct;
}

float movingLine(vec2 uv, vec2 center, float radius)
{
    //angle of the line
    float theta0 = 90.0 * u_time;
    vec2 d = uv - center;
    float r = sqrt(dot(d,d));
    if(r<radius){
        vec2 p = radius*vec2(cos(theta0*3.141592653589793238/180.0),
                            -sin(theta0*3.141592653589793238/180.0));
        float l = length(d - p*clamp( dot(d,p)/dot(p,p), 0.0, 1.0) );
    	d = normalize(d);
        //compute gradient based on angle difference to theta0
   	 	float theta = mod(180.0*atan(d.y,d.x)/3.141592653589793238+theta0,360.0);
        float gradient = clamp(1.0-theta/90.0,0.0,1.0);
        return (1.0-smoothstep(0.0,0.005,l))+0.5*gradient;
    }
    else{
        return 0.0;
    }
}

mat2 rotate2d(float angle){
    return mat2(
        cos(angle),-sin(angle),
        sin(angle),cos(angle)
    );
}

void main(){
    // vec2 st=gl_FragCoord.xy/u_resolution.xy*10.;
    vec2 st=gl_FragCoord.xy/u_resolution.y;
    vec3 color=vec3(0.0);

    float circle_r1=0.02;
    vec3 circle_1=vec3(circle(st,circle_r1));
    circle_1-=vec3(circle(st,circle_r1-0.004));
    circle_1*=blue1;

    float circle_r2=0.15;
    vec3 circle_2=vec3(circle(st,circle_r2));
    circle_2-=vec3(circle(st,circle_r2-0.004));
    circle_2*=blue1;

    float circle_r3=0.25;
    vec3 circle_3=vec3(circle(st,circle_r3));
    circle_3-=vec3(circle(st,circle_r3-0.004));
    circle_3*=blue1;

    float circle_r4=0.35;
    vec3 circle_4=vec3(circle(st,circle_r4));
    circle_4-=vec3(circle(st,circle_r4-0.004));

    st-=0.5;
    float r=sqrt(st.x*st.x+st.y*st.y);
    float theta=atan(st.y/st.x);

    float circle_r5=0.4;
    vec3 circle_5=vec3(step(cos(theta),max(min(cos(u_time),0.92),0.6))*(circle(st+0.5,circle_r5)-circle(st+0.5,circle_r5-0.004)));
    circle_5*=blue1;

    float circle_r6=0.45;
    vec3 circle_6=vec3(step(cos(8.*theta),0.92)*(circle(st+0.5,circle_r6)-circle(st+0.5,circle_r6-0.008)));
    circle_6*=blue1;

    vec3 cross1=vec3(_cross(st,0.000001))*vec3(circle(st+0.5,circle_r4));

    // st=rotate2d(-u_time)*st;
    vec3 line=vec3(movingLine(st,vec2(0.0),circle_r4))*dark_blue;

    color=circle_1+circle_2+circle_3+circle_4+circle_5+circle_6+(cross1*0.4)+line;

    gl_FragColor=vec4(color,1.0);
}